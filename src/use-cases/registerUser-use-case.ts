import { hash } from "bcryptjs"
import { UsersRepository } from "../repositories/user-repository"
import { UserAlreadyExistsError } from "./erros/user-already-exists-error"
import { User } from "@prisma/client"

// Tipagem de entrada

interface RegisterUseCaseProps {
	name: string
	email: string
	password: string
}

// Tipagem de saida

interface RegisterUseCaseResponse {
	user: User
}
// Casos de uso sao casos que independete da forma como uma acao é feita eles seguem o mesmo padrao
// Exemplo: A criacao do nosso usuario independe de onde os dados virao o ORM utlizado e etc

// SOLID

// D - Dependency Inversion Principle

export class RegisterUseCase {
	private usersRepository: UsersRepository

	constructor(usersRepository: UsersRepository) {
		this.usersRepository = usersRepository
	}

	async handleCreateNewUser({
		email,
		name,
		password,
	}: RegisterUseCaseProps): Promise<RegisterUseCaseResponse> {
		/*
		 hash -> (valorParaCriptografar, salt_round)
		 salt_round => quanto maior mais lento o processo de criptografia e mais seguro nosso hash
		*/
		const emailAlreadyExist = await this.usersRepository.findByEmail(email)

		if (emailAlreadyExist) {
			throw new UserAlreadyExistsError()
		}

		const password_hash = await hash(password, 6)

		const user = await this.usersRepository.createUser({
			email,
			name,
			password_hash,
		})

		return {
			user,
		}
	}
}
