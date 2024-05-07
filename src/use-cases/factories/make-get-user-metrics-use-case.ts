import { PrismaCheckIn } from "../../repositories/prisma/prisma-check-ins-repository"
import { PrismaUsers } from "../../repositories/prisma/prisma-users-repository"
import { AutenticationUseCase } from "../authentication-use-case"
import {  GetUserMetricsUseCase } from "../get-user-metrics-use-case"

export function makeGetUserMetricsUseCase(){
    const checkinRepository = new PrismaCheckIn()
    const getUserMetricsUseCase = new GetUserMetricsUseCase(checkinRepository)

    return getUserMetricsUseCase
}