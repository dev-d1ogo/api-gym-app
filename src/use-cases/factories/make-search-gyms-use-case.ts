import { PrismaGyms } from "../../repositories/prisma/prisma-gym-repository,"
import { SearchGymUseCase } from "../search-gyms-use-case"

export function makeSerchGymUseCase(){
    const gymRepository = new PrismaGyms()
    const serchGymUseCase = new SearchGymUseCase(gymRepository)

    return serchGymUseCase
}