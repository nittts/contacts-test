import z from "zod"

export const deleteContactParamSchema = z.object({
  id: z.coerce.number(),
})

export type DeleteContactParam = z.infer<typeof deleteContactParamSchema>
