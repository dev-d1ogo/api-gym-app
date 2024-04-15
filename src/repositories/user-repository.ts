import { Prisma, User } from "@prisma/client";

export interface UsersRepository{
    findByEmail(email:string): Promise<User | null>
    createUser(data:Prisma.UserCreateInput) : Promise<User>
    findById?(id: string): Promise<User | null>
}