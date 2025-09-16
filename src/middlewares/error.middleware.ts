import { Request, Response, NextFunction } from "express"
import z, { ZodError } from "zod"

export function errorHandler(err: any, req: Request, res: Response, _: NextFunction) {
  console.error(err)

  const status = err.status || err.statusCode || 500
  const message = err.message || "Internal Server Error"

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation error",
      details: z.treeifyError(err),
    })
  }

  res.status(status).json({
    status,
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  })
}
