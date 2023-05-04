import { Tenant } from '@/backend/domain/tenant';
import { z } from "zod";
import { schemaForm } from "./schema";

export type FormProps = z.infer<typeof schemaForm>

export type RegisterFormProps = {
  register: (data: Tenant, callback: () => void) => void
  payload: Tenant | null
}