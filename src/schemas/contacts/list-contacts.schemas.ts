import z from "zod"

export const listContactsQuerySchema = z.object({
  cursor: z.coerce.number().optional(),
  limit: z.coerce.number().max(1000).optional(),
})

export type ListContactsQuery = z.infer<typeof listContactsQuerySchema>
