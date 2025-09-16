export type FindByIdRepositoryInputDto = {
  id: number
}

export type FindByIdRepositoryOutputDto = {
  nome: string
  id: number
  telefone: string
  createdAt: Date
  updatedAt: Date
} | null
