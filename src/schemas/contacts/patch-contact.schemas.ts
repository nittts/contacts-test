import { phoneEntry, threeLettersMinimum, twoWordsEntry } from "../../utils/validation"
import z from "zod"

export const patchContactBodySchema = z.object({
  nome: twoWordsEntry("nome").and(threeLettersMinimum("nome")),
  telefone: phoneEntry("telefone"),
})

export type PatchContactBody = z.infer<typeof patchContactBodySchema>

export const patchContactParamSchema = z.object({
  id: z.coerce.number(),
})

export type PatchContactParam = z.infer<typeof patchContactParamSchema>
