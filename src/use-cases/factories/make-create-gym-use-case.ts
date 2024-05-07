import { PrismaGyms } from "../../repositories/prisma/prisma-gym-repository,"
import { CreateGymUseCase } from "../create-gym-use-case"

export function makeCreateGymUseCase(){
    const gymRepository = new PrismaGyms()
    const createGymUseCase = new CreateGymUseCase(gymRepository)

    return createGymUseCase
}