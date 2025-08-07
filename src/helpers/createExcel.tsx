import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/api';

const client = generateClient<Schema>();

export interface CreateExcelResult {
    success: boolean;
    content: string;
}

export async function createExcel(): Promise<CreateExcelResult> {
    try {
        const response = await client.queries.invokeCreateExcel({ payload: "" });
        const result = (response as any).data as CreateExcelResult;
        console.log('Lambda create excel result: ', result);
        return result;
    } catch (error) {
        console.log('Lambda error creating excel: ', error);
        return {
            success: false,
            content: "Error creating excel"
        }
    }
}