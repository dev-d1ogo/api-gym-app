import { Decimal } from "@prisma/client/runtime/library";
import { GymsRepository } from "../repositories/gym-repository";
import { Gym } from "@prisma/client";

// Tipagens

interface CreateGymUseCaseRequest{
    title: string,
    description: string | null,
    phone: string | null
    latitude: number,
    longitude: number
}

interface CreateGymUseCaseResponse{
    gym: Gym
}

export class CreateGymUseCase {
	constructor(private gymRepository: GymsRepository) {}

	async registerGym({
		description,
		latitude,
		longitude,
		phone,
		title,
	}: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
		const gym = await this.gymRepository.createGym({
            latitude,
            longitude,
            title,
            description,
            phone
        })
        
        return {
            gym
        }
	}
}