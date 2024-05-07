import { FastifyReply, FastifyRequest } from "fastify"
import * as zod from "zod"
import { InvalidCredentialsError } from "../../use-cases/erros/invalid-credentials-error"
import { makeAuthenticationUseCase } from "../../use-cases/factories/make-authentication-use-case"
import fastifyJwt from "@fastify/jwt"
import { env } from "../../env"

export async function authenticateUser(
	request: FastifyRequest,
	response: FastifyReply
) {
	const authenticateUserSchema = zod.object({
		email: zod.string().email(),
		password: zod.string().min(6),
	})

	const { email, password } = authenticateUserSchema.parse(request.body)

	try {
		const autenticationUseCase = makeAuthenticationUseCase() // Usando nossa factory
		const  { user } = await autenticationUseCase.authenticate({ email, password })

		const token = await response.jwtSign({}, {
			sign:{
				sub: user.id
			}
		}) 
		return response.status(200).send({token})
		
	} catch (error) {

		if (error instanceof InvalidCredentialsError) {
			return response.status(400).send({ message: error.message })
		}
		throw error
	}

	
}
