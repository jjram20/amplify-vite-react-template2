import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { APIGatewayEvent, Context } from "aws-lambda";
import { storageBucket } from '../../storage/resource';
import * as XLSX from 'xlsx';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import { jsPDF } from 'jspdf';
import { env } from '$amplify/env/createExcelFn'

interface CreateExcelResult {
    success: boolean,
    content: string
}

const s3 = new S3Client({ region: "us-east-1" });

export const handler = async (event: APIGatewayEvent) => {
    console.log(env.STORAGEBUCKET_BUCKET_NAME)
    console.log(env.TABLITA)
    console.log("Function called")
    console.log("Creating excel file")
    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.aoa_to_sheet([
        ['Nombre', 'Edad'],
        ['Juanito',, 67]
    ]);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Nombres");
    const currentDate = new Date().toISOString().replace("T", "-").slice(0, 16);
    const fileName = `public/nombres_${currentDate}.xlsx`

    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    console.log("Excel file created");

    const result: CreateExcelResult = {
        success: true,
        content: "Function createExcel executed"
    }
    
    await s3.send(
        new PutObjectCommand({
            Bucket: env.STORAGEBUCKET_BUCKET_NAME,
            Key: `public/archivo_excel_${currentDate}.xlsx`,
            Body: buffer,
            ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
    )

    const filename_pdf = `public/archivo_pdf_${currentDate}.pdf`
    const filepath_pdf = `/tmp/${filename_pdf}`

    /* const writeStream = fs.createWriteStream(filepath_pdf)

    const doc = new PDFDocument({
        margin: 30,
        size: 'A3',
        layout: 'landscape'
    });

    const fontPath = path.resolve(__dirname, 'data', 'Helvetica.afm');
    doc.font('Helvetica');

    doc.pipe(writeStream)
    doc.text('Archivo de prueba');

    doc.end();

    await new Promise<void>((resolve) => writeStream.on('finish', () => resolve()));

    const buffer_pdf = await readFile(filepath_pdf); */

    const pdf_js = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: 'a3'
    });

    const margin = 30;
    const startX = margin;
    let startY = margin;
    const rowHeight = 40;

    const headers = ['Header 1', 'Header 2', 'Header 3']

    const pageWidth = pdf_js.internal.pageSize.getWidth() - (margin * 2);
    const columnWidth = pageWidth / headers.length;

    pdf_js.setFontSize(14);
    pdf_js.text('Stowed Products Report', startX, startY);

    pdf_js.setFontSize(8);
    const currentDateContentPdf = new Date().toLocaleString();
    pdf_js.text(`Generated: ${currentDateContentPdf}`, startX, startY + 15);

    startY += 15;

    pdf_js.setFontSize(10);
    headers.forEach((header, i) => {
        const x = startX + (i * columnWidth);
        pdf_js.rect(x, startY, columnWidth, rowHeight);
        pdf_js.text(header, x+2, startY+15, {
            maxWidth: columnWidth - 4,
        })
    })

    pdf_js.text('Archivo de prueba jspdf', 10, 10);
    const buffer_pdf = Buffer.from(pdf_js.output('arraybuffer'))

    await s3.send(
        new PutObjectCommand({
            Bucket: env.STORAGEBUCKET_BUCKET_NAME,
            Key: `public/archivo_pdf_${currentDate}.pdf`,
            Body: buffer_pdf,
            ContentType: 'application/pdf',
        })
    )

    console.log("Result: ", result);
    
    return result;
}