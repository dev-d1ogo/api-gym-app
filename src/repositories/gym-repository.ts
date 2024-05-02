import { Gym, Prisma } from "@prisma/client";

export interface findManyByUserCoordinateParams{
    userLatitude: number, 
    userLongitude: number
}

export interface GymsRepository{
    createGym(data: Prisma.GymCreateInput): Promise<Gym>
    findById(id: string): Promise<Gym | null>
    searchManyByQuery(query:string, page: number):Promise<Gym[]>
    findManyByUserCoordinate({userLatitude, userLongitude}:findManyByUserCoordinateParams): Promise<Gym[]>

}