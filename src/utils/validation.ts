import z from "zod"

export const twoWordsEntry = (field: string) =>
  z.string().refine((val) => val.trim().split(/\s+/).length >= 2, {
    message: `${field} deve possuir ao mínimo 2 palavras.`,
  })

export const phoneEntry = (field: string) =>
  z.string().refine(
    (val) => {
      const cleaned = val.replace(/\D/g, "")
      return cleaned.length >= 10 && cleaned.length <= 13
    },
    {
      message: `${field} deve ser um número brasileiro`,
    }
  )

export const threeLettersMinimum = (field: string) =>
  z.string().refine(
    (val) =>
      val
        .trim()
        .split(/\s+/)
        .every((word) => word.length >= 3),
    {
      message: `${field} deve possuir palavras com no mínimo 3 letras.`,
    }
  )
