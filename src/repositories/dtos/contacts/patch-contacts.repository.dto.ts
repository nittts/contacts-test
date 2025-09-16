export type PatchContactRepositoryInputDto = {
  id: number
  nome: string
  telefone: string
}

export type PatchContactRepositoryOutputDto = {
  nome: string
  id: number
  telefone: string
  createdAt: Date
  updatedAt: Date
}
