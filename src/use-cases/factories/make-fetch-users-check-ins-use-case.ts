import { PrismaCheckIn } from "../../repositories/prisma/prisma-check-ins-repository"
import { FetchHistoryUseCase } from "../fetch-users-check-ins-use-case"

export function makeFetchUsersCheckInsUseCase(){
    const checkinRepository= new PrismaCheckIn()
    const fetchUsersCheckInsUseCase = new FetchHistoryUseCase( checkinRepository)

    return fetchUsersCheckInsUseCase
}