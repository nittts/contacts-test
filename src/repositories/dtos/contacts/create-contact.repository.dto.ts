export type CreateContactRepositoryInputDto = {
  nome: string
  telefone: string
}

export type CreateContactRepositoryOutputDto = {
  nome: string
  id: number
  telefone: string
  createdAt: Date
  updatedAt: Date
}
