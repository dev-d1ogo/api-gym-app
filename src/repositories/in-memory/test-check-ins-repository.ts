import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-in-repository"
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

// Simulando nosso banco de dados

export class CheckInsInMemoryRepository implements CheckInsRepository{
    public checkins:CheckIn[] = []

    async findByUserIdOnDate(userId: string, date: Date){
        const startOfTheDay = dayjs(date).startOf('date')  // Inicio do dia
        const endOfTheDay = dayjs(date).endOf('date') // Fim do dia

        const checkInOnSameDate = this.checkins.find(checkin => {
            const checkInDate = dayjs(checkin.created_at)
            const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

            return checkin.user_id === userId && isOnSameDate
        })

        if(!checkInOnSameDate){
            return null
        }

        return checkInOnSameDate
    }
    
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

    async findManyByUserId(userId: string, page: number){
        const userCheckIns = this.checkins
            .filter(item => item.user_id === userId)
            .slice((page - 1) * 20, page * 20) // pagination

        return userCheckIns
    }

    async countByUserId(userId: string){
        const userCheckInsAmount = this.checkins
            .filter(item => item.user_id === userId).length

        return userCheckInsAmount
    }
}