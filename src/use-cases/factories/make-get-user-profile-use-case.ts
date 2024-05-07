import { PrismaUsers } from "../../repositories/prisma/prisma-users-repository"
import { GetProfileUseCase } from "../get-user-profile-use-case"

export function makeGetUserProfileUseCase(){
    const userRepository = new PrismaUsers()
    const getUserProfileUseCase = new GetProfileUseCase(userRepository)

    return getUserProfileUseCase
}