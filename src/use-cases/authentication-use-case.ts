import { compare } from "bcryptjs"
import { UsersRepository } from "../repositories/user-repository"
import { InvalidCredentialsError } from "./erros/invalid-credentials-error"
import { User } from "@prisma/client"

// Tipagem de entrada

interface AutenticationUseCaseProps {
	email: string
	password: string
}

// Tipagem de saida

interface AutenticationUseCaseResponse {
    user: User 
}


export class AutenticationUseCase {
	private userRepository: UsersRepository

	constructor(userRepository: UsersRepository) {
		this.userRepository = userRepository
	}

	async authenticate({
		email,
		password,
	}: AutenticationUseCaseProps): Promise<AutenticationUseCaseResponse> {
		// auth user
		const user = await this.userRepository.findByEmail(email)

		if (!user) {
			throw new InvalidCredentialsError()
		}

        const doesPasswordMatches = await compare(password, user.password_hash) // Senhas iguais

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }

        return{
            user
        }
	}
}
