import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepository{
    createCheckIn(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}