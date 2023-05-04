import { z } from "zod";

export const schemaForm = z.object({
  tenant: z.object({
    id: z.string().optional(),
    name: z.string().min(3, "Complete o nome do condômino").max(30, "Limite do campo atingido"),
    apartment: z.string().regex(new RegExp("^[1-4]$"), "São permitidos os apartamentos do 1 ao 4")
  })
}).transform((field) => ({
  tenant: {
    id: field.tenant.id,
    name: field.tenant.name,
    apartment: field.tenant.apartment
  }
}))
