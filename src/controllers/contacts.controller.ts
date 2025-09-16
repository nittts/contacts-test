import { Request, Response } from "express"
import { CreateContactUsecase } from "../usecases/create-contact.usecase"
import { ListContactsUseCase } from "../usecases/list-contacts.usecase"
import { PatchContactUseCase } from "../usecases/patch-contact.usecase"
import { DeleteContactUsecase } from "../usecases/delete-contact.usecase"

export class ContactsController {
  private readonly createContactUsecase: CreateContactUsecase
  private readonly listContactsUsecase: ListContactsUseCase
  private readonly patchContactUsecase: PatchContactUseCase
  private readonly deleteContactUsecase: DeleteContactUsecase

  constructor() {
    this.createContactUsecase = new CreateContactUsecase()
    this.listContactsUsecase = new ListContactsUseCase()
    this.patchContactUsecase = new PatchContactUseCase()
    this.deleteContactUsecase = new DeleteContactUsecase()
  }

  async create(req: Request, res: Response) {
    const { body } = req

    const data = await this.createContactUsecase.execute(body)

    return res.status(201).json({ message: "success", data })
  }

  async index(req: Request, res: Response) {
    const { query } = req

    const data = await this.listContactsUsecase.execute(query)

    return res.status(200).json({ message: "success", data })
  }

  async patch(req: Request, res: Response) {
    const { body, params } = req

    const data = await this.patchContactUsecase.execute({
      id: Number(params.id),
      nome: body.nome,
      telefone: body.telefone,
    })

    return res.status(200).json({ message: "success", data })
  }

  async delete(req: Request, res: Response) {
    const { params } = req

    const data = await this.deleteContactUsecase.execute({ id: Number(params.id) })

    return res.status(204).json({ message: data.success ? "success" : "error", data })
  }
}
