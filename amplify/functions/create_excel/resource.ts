import { defineFunction } from "@aws-amplify/backend";
import { storageBucket } from "../../storage/resource";

export const createExcel = defineFunction({
    name: "createExcelFn",
    entry: "./handler.ts",
    environment: {
        TABLITA: "nombre_tablita"
    }
    /*environment: {
        BUCKET_NAME: storageBucket.resources.s3Bucket.bucketName // 👈 esto pasa el nombre real como env var
    },
    permissions: {
        "s3:*": [iam.resources.s3.bucket(storageBucket.resources.s3Bucket.bucketName)],
    },*/
})