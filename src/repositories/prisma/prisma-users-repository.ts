// Criamos uma classe Prisma User que será a porta de entrada com diversos metodos para nosso banco de dados na tabela User

import { prisma } from "../../../db/prisma"
import { Prisma } from "@prisma/client"
import { UsersRepository } from "../user-repository"

// O Prisma quando cria nossas tabelas ele tambem cria uma tipagem para cada tabela

// Caso no futuro seja necessario mudar o ORM temos que alterar praticamente essa parte

export class PrismaUsers implements UsersRepository {
	async findByEmail(email: string) {
		const userWithSameEmail = await prisma.user.findUnique({
			where: {
				email,
			},
		})

		return userWithSameEmail
	}

	async createUser(data: Prisma.UserCreateInput) {
		const { email, name, password_hash } = data
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password_hash,
			},
		})

		return user
	}

	async findById(id: string) {
		const user = await prisma.user.findUnique({
			where: {
                id
            }
		})

        return user
	}
}
