import { ContactsRepository } from "../repositories/contacts.repository"
import { ListContactsUsecaseInputDto, ListContactsUsecaseOutputDto } from "./dtos/contacts/list-contacts.usecase.dto"

export class ListContactsUseCase {
  private readonly contactsRepository: ContactsRepository

  constructor() {
    this.contactsRepository = new ContactsRepository()
  }

  async execute(input: ListContactsUsecaseInputDto): Promise<ListContactsUsecaseOutputDto> {
    return this.contactsRepository.list(input)
  }
}
