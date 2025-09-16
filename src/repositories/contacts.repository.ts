import {
  ListContactsRepositoryInputDto,
  ListContactsRepositoryOutputDto,
} from "./dtos/contacts/list-contacts.repository.dto"
import { DatabaseService } from "../database/database.service"
import {
  CreateContactRepositoryInputDto,
  CreateContactRepositoryOutputDto,
} from "./dtos/contacts/create-contact.repository.dto"
import {
  FindByPhoneRepositoryInputDto,
  FindByPhoneRepositoryOutputDto,
} from "./dtos/contacts/find-by-phone.repository.dto"
import { validContact } from "./schemas/contacts.schemas"
import {
  PatchContactRepositoryInputDto,
  PatchContactRepositoryOutputDto,
} from "./dtos/contacts/patch-contacts.repository.dto"
import { FindByIdRepositoryInputDto, FindByIdRepositoryOutputDto } from "./dtos/contacts/find-by-id.repository.dto"
import {
  DeleteContactRepositoryInputDto,
  DeleteContactRepositoryOutputDto,
} from "./dtos/contacts/delete-contacto.repository.dto"

export class ContactsRepository {
  private readonly db: DatabaseService

  constructor() {
    this.db = new DatabaseService()
  }

  async create(input: CreateContactRepositoryInputDto): Promise<CreateContactRepositoryOutputDto> {
    const sql = "INSERT INTO contacts (nome, telefone) VALUES (?, ?)"

    await this.db.query(sql, [input.nome, input.telefone])

    const selectRow = await this.getLatestInsert()

    return validContact.parse(selectRow)
  }

  async findByPhone(input: FindByPhoneRepositoryInputDto): Promise<FindByPhoneRepositoryOutputDto> {
    const sql = "SELECT * FROM contacts WHERE telefone = ?"

    const rows = await this.db.query(sql, [input.telefone])

    if (!rows.length) {
      return null
    }

    return validContact.parse(rows[0])
  }

  async findById(input: FindByIdRepositoryInputDto): Promise<FindByIdRepositoryOutputDto> {
    const sql = "SELECT * FROM contacts WHERE id = ?"

    const rows = await this.db.query(sql, [input.id])

    if (!rows.length) {
      return null
    }

    return validContact.parse(rows[0])
  }

  async list(input: ListContactsRepositoryInputDto): Promise<ListContactsRepositoryOutputDto> {
    const limit = input.limit ?? 10

    const query = input.cursor
      ? "SELECT * FROM contacts WHERE id > ? ORDER BY id ASC LIMIT " + limit
      : "SELECT * FROM contacts ORDER BY id ASC LIMIT " + limit

    const params = input.cursor ? [input.cursor] : []

    const rows = await this.db.query(query, params)

    const nextCursor = rows.length ? rows[rows.length - 1].id : null

    return { contacts: rows, nextCursor }
  }

  async patch(input: PatchContactRepositoryInputDto): Promise<PatchContactRepositoryOutputDto> {
    const { id, ...rest } = input

    const fields = []
    const values = []

    for (const [key, value] of Object.entries(rest)) {
      if (value !== undefined) {
        fields.push(`${key} = ?`)
        values.push(value)
      }
    }

    if (fields.length === 0) {
      throw new Error("No fields to update")
    }

    const query = `UPDATE contacts SET ${fields.join(", ")} WHERE id = ?`
    values.push(id)

    await this.db.query(query, values)

    const selectRow = await this.findById({ id: input.id })

    return validContact.parse(selectRow)
  }

  async delete(input: DeleteContactRepositoryInputDto): Promise<DeleteContactRepositoryOutputDto> {
    const result = await this.db.query("DELETE FROM contacts WHERE id = ?", [input.id])

    if (result.affectedRows > 0) {
      return { success: true }
    }

    return { success: false }
  }

  private async getLatestInsert() {
    const selectRows = await this.db.query("SELECT * FROM contacts WHERE id = LAST_INSERT_ID()")

    return selectRows[0]
  }
}
