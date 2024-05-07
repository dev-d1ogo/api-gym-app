import { PrismaCheckIn } from "../../repositories/prisma/prisma-check-ins-repository"
import { PrismaGyms } from "../../repositories/prisma/prisma-gym-repository,"
import { CheckInUseCase } from "../checkin-use-case"

export function makeCheckInUseCase(){
    const checkinRepository = new PrismaCheckIn()
    const gymRepository = new PrismaGyms()
    const checkInUseCase = new CheckInUseCase(checkinRepository, gymRepository)

    return checkInUseCase
}