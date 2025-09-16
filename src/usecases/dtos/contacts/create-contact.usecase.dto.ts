export type CreateContactUsecaseInputDto = {
  nome: string
  telefone: string
}

export type CreateContactUsecaseOutputDto = {
  nome: string
  id: number
  telefone: string
  createdAt: Date
  updatedAt: Date
}
