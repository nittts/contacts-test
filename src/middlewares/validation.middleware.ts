import { Request, Response, NextFunction } from "express"
import { ZodSchema, treeifyError } from "zod"

export type ZodRequestTarget = "body" | "query" | "params"

export const validate =
  (schema: ZodSchema<unknown>, target: ZodRequestTarget = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const data = req[target]

    const result = schema.safeParse(data)

    if (!result.success) {
      const formattedErrors = treeifyError(result.error)
      return res.status(400).json({
        message: "Validation failed",
        errors: formattedErrors,
      })
    }

    if (["body", "params"].includes(target)) {
      req[target] = result.data
    }

    next()
  }
