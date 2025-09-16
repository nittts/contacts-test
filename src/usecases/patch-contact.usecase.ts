import { ContactsRepository } from "../repositories/contacts.repository"
import { PatchContactUsecaseInputDto, PatchContactUsecaseOutputDto } from "./dtos/contacts/patch-contact.usecase.dto"

export class PatchContactUseCase {
  private readonly contactsRepository: ContactsRepository

  constructor() {
    this.contactsRepository = new ContactsRepository()
  }

  async execute(input: PatchContactUsecaseInputDto): Promise<PatchContactUsecaseOutputDto> {
    await this.validate(input)

    return await this.contactsRepository.patch(input)
  }

  async validate(input: PatchContactUsecaseInputDto) {
    const contactExists = await this.contactsRepository.findById({ id: input.id })

    if (!contactExists) {
      throw new Error("Contato não encontrado")
    }
  }
}
