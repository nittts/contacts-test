export type FindByPhoneRepositoryInputDto = {
  telefone: string
}

export type FindByPhoneRepositoryOutputDto = {
  nome: string
  id: number
  telefone: string
  createdAt: Date
  updatedAt: Date
} | null
