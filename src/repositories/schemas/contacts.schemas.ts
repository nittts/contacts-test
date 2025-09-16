import z from "zod"

export const validContact = z.object({
  nome: z.string(),
  id: z.number(),
  telefone: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
