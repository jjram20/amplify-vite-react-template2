import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { APIGatewayEvent, Context } from "aws-lambda";
import { storageBucket } from '../../storage/resource';
// import * as XLSX from 'xlsx';

export const handler = async (event: APIGatewayEvent) => {
    /*const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.aoa_to_sheet([
        ['Nombre', 'Edad'],
        ['Juanito',, 67]
    ]);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Nombres");
    const currentDate = new Date().toISOString().replace("T", "-").slice(0, 16);
    const fileName = `public/nombres_${currentDate}.xlsx`

    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    */
    return "File created";
}