export type ListContactsUsecaseInputDto = {
  cursor?: number
  limit?: number
}

export type ListContactsUsecaseOutputDto = {
  contacts: { nome: string; id: number; telefone: string; createdAt: Date; updatedAt: Date }[]
  nextCursor: number | null
}
