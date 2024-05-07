import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-in-repository";
import { prisma } from "../../../db/prisma";
import dayjs from "dayjs";


export class PrismaCheckIn implements CheckInsRepository{
    async createCheckIn(data:Prisma.CheckInUncheckedCreateInput) {
        const checkIn = await prisma.checkIn.create({
            data
        }) 

        return checkIn
    }

    async saveCheckIn(checkIn: { id: string; created_at: Date; validated_at: Date; user_id: string; gym_id: string; }) {
        const checkInToUptdate = await prisma.checkIn.update({
            where:{
                id:checkIn.id
            },
            data: checkIn
        })

        return checkInToUptdate
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date')  // Inicio do dia
        const endOfTheDay = dayjs(date).endOf('date') // Fim do dia

        // Usamos find first para encontrar registros que nao sao unicos na nossa tabela

        const checkInOnSameDate = await prisma.checkIn.findFirst({
            where:{
                user_id: userId,
                created_at: {
                    gte: startOfTheDay.toDate(), // gte => greater than or equal: Maior ou igual usado para comparar datas no Prisma
                    lte: endOfTheDay.toDate()    // gte => lower than or equal: Menor ou igual usado para comparar datas no Prisma
                }
            }
        })

        return checkInOnSameDate
    }

    findManyByUserId(userId: string, page: number){
        const checkIns = prisma.checkIn.findMany({
            where:{
                id: userId,
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return checkIns
    }

    async findById(checkInId: string) {
        const checkIn = await prisma.checkIn.findUnique({
            where:{
                id: checkInId
            }
        })

        return checkIn
    }

    async countByUserId(userId: string): Promise<number> {
        const checkInAmount = await prisma.checkIn.count({
            where:{
                user_id: userId
            }
        })

        return checkInAmount
    }
}