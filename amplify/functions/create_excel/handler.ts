import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { APIGatewayEvent, Context } from "aws-lambda";
import { storageBucket } from '../../storage/resource';
import * as XLSX from 'xlsx';

interface CreateExcelResult {
    success: boolean,
    content: string
}

const s3 = new S3Client({ region: "us-east-1" });

export const handler = async (event: APIGatewayEvent) => {
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
            Bucket: "amplify-amplifyvitereactt-storagebucketbucket92d1b-2mzp6pir7i6i",
            Key: `public/archivo_excel_${currentDate}.xlsx`,
            Body: buffer,
            ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
    )

    console.log("Result: ", result);
    
    return result;
}