import { Router } from "express"
import { ContactsController } from "../controllers/contacts.controller"
import { validate } from "../middlewares/validation.middleware"
import { createContactBodySchema } from "../schemas/contacts/create-contact.schemas"
import { bindController } from "../utils/binding"
import { listContactsQuerySchema } from "../schemas/contacts/list-contacts.schemas"
import { patchContactBodySchema, patchContactParamSchema } from "../schemas/contacts/patch-contact.schemas"
import { deleteContactParamSchema } from "../schemas/contacts/delete-contact.schemas"

const contactsController = bindController(new ContactsController())

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Contatos
 *   description: Endpoints da API para gerenciar contatos
 */

/**
 * @swagger
 * /contatos:
 *   post:
 *     summary: Cria um novo contato
 *     tags: [Contatos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateContactBody'
 *     responses:
 *       201:
 *         description: Contato criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Erro de validação
 */
router.post("/", validate(createContactBodySchema, "body"), contactsController.create)

/**
 * @swagger
 * /contatos:
 *   get:
 *     summary: Lista os contatos
 *     tags: [Contatos]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Quantidade de contatos por página
 *     responses:
 *       200:
 *         description: Lista de contatos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */
router.get("/", validate(listContactsQuerySchema, "query"), contactsController.index)

/**
 * @swagger
 * /contatos/{id}:
 *   patch:
 *     summary: Atualiza um contato
 *     tags: [Contatos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do contato
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatchContactBody'
 *     responses:
 *       200:
 *         description: Contato atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Contato não encontrado
 */
router.patch(
  "/:id",
  validate(patchContactBodySchema, "body"),
  validate(patchContactParamSchema, "params"),
  contactsController.patch
)

/**
 * @swagger
 * /contatos/{id}:
 *   delete:
 *     summary: Deleta um contato
 *     tags: [Contatos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do contato
 *     responses:
 *       204:
 *         description: Contato deletado com sucesso
 *       404:
 *         description: Contato não encontrado
 */
router.delete("/:id", validate(deleteContactParamSchema, "params"), contactsController.delete)

export default router

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateContactBody:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: João da Silva
 *         telefone:
 *           type: string
 *           example: "+5511999999999"
 *       required:
 *         - nome
 *         - telefone
 *     PatchContactBody:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: João Souza
 *         telefone:
 *           type: string
 *           example: "+5511988888888"
 *     Contact:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "64f8a2e4b1a2c3d4e5f67890"
 *         nome:
 *           type: string
 *           example: João da Silva
 *         telefone:
 *           type: string
 *           example: "+5511999999999"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-16T12:34:56.789Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-16T12:34:56.789Z"
 */
