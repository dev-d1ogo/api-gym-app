import { Gym, Prisma } from "@prisma/client";

export interface GymsRepository{
    createGym(data: Prisma.GymCreateInput): Promise<Gym>
    findById(id: string): Promise<Gym | null>
}