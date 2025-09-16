import { phoneEntry, threeLettersMinimum, twoWordsEntry } from "../../utils/validation"
import z from "zod"

export const createContactBodySchema = z.object({
  nome: twoWordsEntry("nome").and(threeLettersMinimum("nome")),
  telefone: phoneEntry("telefone"),
})

export type CreateContactBody = z.infer<typeof createContactBodySchema>
