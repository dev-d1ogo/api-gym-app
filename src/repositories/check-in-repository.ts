import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepository{
    createCheckIn(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    saveCheckIn(checkIn: CheckIn):Promise<CheckIn>

    findByUserIdOnDate(userId: string, date: Date):  Promise<CheckIn | null> // Verifica se há um checkIn de um dado usuario em uma data
    findManyByUserId(userId: string, page: number): Promise<CheckIn[] | null>
    findById(checkInId: string): Promise<CheckIn | null>

    countByUserId(userId: string):Promise<number>
}