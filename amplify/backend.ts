import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { createExcel } from './functions/create_excel/resource';

defineBackend({
  auth,
  data,
  createExcel
});
