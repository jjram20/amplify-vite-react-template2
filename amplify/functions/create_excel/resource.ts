import { defineFunction } from "@aws-amplify/backend";

export const createExcel = defineFunction({
    name: "createExcelFn",
    entry: "./handler.ts"
})