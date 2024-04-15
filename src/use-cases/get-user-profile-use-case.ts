import { User } from "@prisma/client"
import { UsersRepository } from "../repositories/user-repository"
import { ResourceNotFoundError } from "./erros/resource-not-found-error"

interface GetProfileUseCaseProps {
    UserId: string,
}

interface GetProfileUseCaseResponse {
    user: User 
}

export class GetProfileUseCase {
	constructor(private userRepository: UsersRepository) {
    }
    
	async getProfile({UserId}: GetProfileUseCaseProps): Promise<GetProfileUseCaseResponse> {
		// get user info
        const user = await this.userRepository.findById(UserId)

        if(!user){
            throw new ResourceNotFoundError()
        }

        return {
            user
        } 
    }
}
