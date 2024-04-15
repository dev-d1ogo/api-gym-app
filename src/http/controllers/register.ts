import { FastifyReply, FastifyRequest } from "fastify"
import * as zod from "zod"
import { RegisterUseCase } from "../../use-cases/registerUser-use-case"
import { PrismaUsers } from "../../repositories/prisma/prisma-users-repository"
import { UserAlreadyExistsError } from "../../use-cases/erros/user-already-exists-error"
import { makeRegisterUseCase } from "../../use-cases/factories/make-register-use-case"

export async function registerUser(
	request: FastifyRequest,
	response: FastifyReply
) {
	const registerUserSchema = zod.object({
		name: zod.string(),
		email: zod.string().email(),
		password: zod.string().min(6),
	})
	
	const { name, email, password } = registerUserSchema.parse(request.body)

	try {
		const registerUseCase = makeRegisterUseCase() // Usando nossa factory

		await registerUseCase.handleCreateNewUser({ 
			name, 
			email, 
			password 
		})

	} catch (error) {
		if(error instanceof UserAlreadyExistsError){
			return response.status(409).send({message: error.message})
		}
		
		throw error
	}

	return response.status(201).send()
}
