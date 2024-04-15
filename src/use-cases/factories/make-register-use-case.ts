import { PrismaUsers } from "../../repositories/prisma/prisma-users-repository"
import { RegisterUseCase } from "../registerUser-use-case"

// Fabricando nossas dependencias para o caso de use
export function makeRegisterUseCase(){
    const prismaUser = new PrismaUsers() // Insatancia do nosso ORM -> Qual a ferramenta nosso caso de uso vai utilizar
	const registerUseCase = new RegisterUseCase(prismaUser) // Instancia do caso de uso -> Cria um novo usuario


    return registerUseCase
}