import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepository{
    createCheckIn(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findByUserIdOnDate(userId: string, date: Date):  Promise<CheckIn | null> // Verifica se há um checkIn de um dado usuario em uma data
}