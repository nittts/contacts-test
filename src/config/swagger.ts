import swaggerJSDoc from "swagger-jsdoc"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contatos API",
      version: "1.0.0",
      description: "Documentação do teste de Contatos",
    },
    servers: [
      {
        url: `http://${process.env.HOST || "localhost"}:${process.env.PORT || "3000"}`,
      },
    ],
  },
  apis: ["src/router/*.ts"],
}

export const docs = swaggerJSDoc(options)
