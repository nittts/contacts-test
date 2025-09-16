import { ContactsRepository } from "../repositories/contacts.repository"
import { DeleteContactUsecaseInputDto, DeleteContactUsecaseOutputDto } from "./dtos/contacts/delete-contact.usecase.dto"

export class DeleteContactUsecase {
  private readonly contactsRepository: ContactsRepository

  constructor() {
    this.contactsRepository = new ContactsRepository()
  }

  async execute(input: DeleteContactUsecaseInputDto): Promise<DeleteContactUsecaseOutputDto> {
    try {
      await this.validate(input)

      const { success } = await this.contactsRepository.delete(input)

      if (!success) {
        return { success, error: "failed to delete row." }
      }

      return { success }
    } catch (e) {
      if (e instanceof Error) {
        return { success: false, error: String(e.message) }
      }

      return { success: false }
    }
  }

  async validate(input: DeleteContactUsecaseInputDto) {
    const contactExists = await this.contactsRepository.findById({ id: input.id })

    if (!contactExists) {
      throw new Error("Contato não encontrado")
    }
  }
}
