export type PatchContactUsecaseInputDto = {
  id: number
  nome: string
  telefone: string
}

export type PatchContactUsecaseOutputDto = {
  nome: string
  id: number
  telefone: string
  createdAt: Date
  updatedAt: Date
}
