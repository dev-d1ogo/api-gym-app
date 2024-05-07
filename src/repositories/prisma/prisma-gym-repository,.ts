import { Gym, Prisma } from "@prisma/client"
import {
    GymsRepository,
    findManyByUserCoordinateParams,
} from "../gym-repository"
import { prisma } from "../../../db/prisma"

// Simulando nosso banco de dados

export class PrismaGyms implements GymsRepository {
    async createGym(data: Prisma.GymCreateInput){
        const createdGym = await prisma.gym.create({
            data,
        })

        return createdGym
    }
    async findById(gymId: string){
        const gym = await prisma.gym.findUnique({
            where:{
                id: gymId
            }
        })

        return gym
    }
    async searchManyByQuery(query: string, page: number){
        const gyms = prisma.gym.findMany({
            where:{
                title:{
                    contains: query
                }
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return gyms
    }
    async findManyByUserCoordinate({ userLatitude, userLongitude }: findManyByUserCoordinateParams) {
        // query raw escreve SQL bruto

        const nearbyGyms = await prisma.$queryRaw<Gym[]>`
            SELECT * FROM gyms
            WHERE ( 6371 * acos( cos( radians(${userLatitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${userLongitude}) ) + sin( radians(${userLatitude}) ) * sin( radians( latitude ) ) ) ) <= 10;
        `
        return nearbyGyms
    }
	
}
