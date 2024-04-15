import { User } from "@prisma/client";
import { UsersRepository } from "../user-repository"

// Simulando nosso banco de dados

export class UsersInMemoryRepository implements UsersRepository{
    public users:User[] = []

    async findByEmail(email:string){
        const user = this.users.find(user => user.email === email)

        if(!user){
            return null
        }
        return user
    }
    
    async createUser(data:User){
        const user = {
            id: 'user-1',
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date()
        }

        this.users.push(user)

        return user
    }

    async findById(id: string) {
        const user = this.users.find(user => id === user.id)

        if(!user){
            return null
        }

        return user
    }
}