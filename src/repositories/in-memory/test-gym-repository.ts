import { Gym, Prisma } from "@prisma/client";
import { GymsRepository } from "../gym-repository";
import { randomUUID } from "crypto";

// Simulando nosso banco de dados

export class GymsInMemoryRepository implements GymsRepository{
    public gyms:Gym[] = []

    async createGym(data:Prisma.GymCreateInput){
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            phone: data.phone,
            created_at: new Date()
        }

        this.gyms.push(gym)

        return gym
    }

    async findById(id: string) {
        const gym = this.gyms.find(gym => id === gym.id)

        if(!gym){
            return null
        }

        return gym
    }
}