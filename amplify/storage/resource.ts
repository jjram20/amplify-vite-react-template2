import { defineStorage } from '@aws-amplify/backend';

export const storageBucket = defineStorage({
    name: "storagebucket",
    access: (allow) => ({
        'public/*': [allow.guest.to(['read', 'write'])]
    })
})