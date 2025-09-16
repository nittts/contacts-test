import { Router } from "express"
import { Request, Response } from "express"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Endpoints para verificar se a aplicação está rodando
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verifica se a aplicação está rodando
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Aplicação rodando corretamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 running:
 *                   type: boolean
 *                   example: true
 */
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ running: true })
})

export default router
