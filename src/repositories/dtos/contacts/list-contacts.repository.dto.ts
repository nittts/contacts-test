export type ListContactsRepositoryInputDto = {
  cursor?: number
  limit?: number
}

export type ListContactsRepositoryOutputDto = {
  contacts: { nome: string; id: number; telefone: string; createdAt: Date; updatedAt: Date }[]
  nextCursor: number | null
}
