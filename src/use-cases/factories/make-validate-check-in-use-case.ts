import { PrismaCheckIn } from "../../repositories/prisma/prisma-check-ins-repository"
import { PrismaUsers } from "../../repositories/prisma/prisma-users-repository"
import { FetchHistoryUseCase } from "../fetch-users-check-ins-use-case"
import { ValidateCheckInUseCase } from "../validate-check-in-use-case"

export function makeValidateCheckInUseCase(){
    const checkinRepository= new PrismaCheckIn()
    const validateCheckInUseCase = new ValidateCheckInUseCase( checkinRepository)

    return validateCheckInUseCase
}