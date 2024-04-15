import { PrismaUsers } from "../../repositories/prisma/prisma-users-repository"
import { AutenticationUseCase } from "../authentication-use-case"

export function makeAuthenticationUseCase(){
    const userRepository = new PrismaUsers()
    const autenticationUseCase = new AutenticationUseCase(userRepository)

    return autenticationUseCase
}