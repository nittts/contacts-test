import dotenv from "dotenv"
import * as swaggerUi from "swagger-ui-express"

dotenv.config()

import express from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import { errorHandler } from "./middlewares/error.middleware"
import contactsRouter from "./router/contacts"
import healthRouter from "./router/health"
import { docs } from "./config/swagger"

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use("/contatos", contactsRouter)
app.use("/health", healthRouter)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(docs))
app.use(errorHandler)

export default app
