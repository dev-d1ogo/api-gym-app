import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-in-repository"
import { randomUUID } from "node:crypto";

// Simulando nosso banco de dados

export class CheckInsInMemoryRepository implements CheckInsRepository{
    public checkins:CheckIn[] = []

    async createCheckIn(data:Prisma.CheckInUncheckedCreateInput){
        const {gym_id, user_id} = data
        const checkin:CheckIn = {
            id: randomUUID(),
            created_at: new Date(),
            gym_id,
            user_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null // verificando se recebemos a verificao ou nao
        }

        this.checkins.push(checkin)

        return checkin
    }

}