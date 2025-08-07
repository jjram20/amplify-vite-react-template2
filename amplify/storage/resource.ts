import { defineStorage } from '@aws-amplify/backend';
import { createExcel } from '../functions/create_excel/resource';

export const storageBucket = defineStorage({
    name: "storagebucket",
    access: (allow) => ({
        'public/*': [allow.guest.to(['read', 'write'])],
        'functions/*': [allow.resource(createExcel).to(['read', 'write'])]
    })
})