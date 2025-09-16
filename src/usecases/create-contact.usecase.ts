import { ContactsRepository } from "../repositories/contacts.repository"
import { CreateContactUsecaseInputDto, CreateContactUsecaseOutputDto } from "./dtos/contacts/create-contact.usecase.dto"

export class CreateContactUsecase {
  private readonly contactsRepository: ContactsRepository

  constructor() {
    this.contactsRepository = new ContactsRepository()
  }

  async execute(input: CreateContactUsecaseInputDto): Promise<CreateContactUsecaseOutputDto> {
    await this.validate(input)

    return this.contactsRepository.create(input)
  }

  async validate(input: CreateContactUsecaseInputDto) {
    const alreadyExists = await this.contactsRepository.findByPhone(input)

    if (alreadyExists) {
      throw new Error("Telefone já registrado.")
    }
  }
}
