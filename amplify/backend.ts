import { defineBackend } from '@aws-amplify/backend';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { createExcel } from './functions/create_excel/resource';
import { storageBucket } from './storage/resource';

export const backend = defineBackend({
  auth,
  data,
  storageBucket,
  createExcel,
});

backend.createExcel.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    sid: 'AllowS3AccessForCreateExcel',
    actions: [
      's3:PutObject',
      's3:GetObject',
      's3:ListBucket'
    ],
    resources: [
      `arn:aws:s3:::amplify-*`,
      `arn:aws:s3:::amplify-*/*`
    ]
  })
)