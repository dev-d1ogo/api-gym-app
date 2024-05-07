import fastify from "fastify"
import { appRoutes } from "./http/routes"
import { ZodError } from "zod"
import { env } from "./env"
import fastifyJwt from "@fastify/jwt"

export const app = fastify()

// Implementando o jwt
app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
})

// Criando nosso plugin de rotas

app.register(appRoutes)


// Handler para tratativa de erros mais genericos

app.setErrorHandler((error, _request, response) => {
    // Erro de validacao
    if(error instanceof ZodError){
        return response.status(400).send({message: "Validation error", issues: error.format()})
    }

    if(env.NODE_ENV !== 'production'){
        console.error(error)
    }
    return response.status(500).send({message: "Internal server error"})
})