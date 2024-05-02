import { GymsRepository } from "../repositories/gym-repository"
import { Gym } from "@prisma/client"
import { ResourceNotFoundError } from "./erros/resource-not-found-error"

// Tipagens

interface FetchNearbyGymsUseCaseRequest {
    userLatitude: number,
    userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
	gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
	constructor(private gymRepository: GymsRepository) {}

	async fetchNearbyGyms({
		userLatitude,
        userLongitude
	}: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
		const gyms = await this.gymRepository.findManyByUserCoordinate({userLatitude, userLongitude})

        if(gyms.length === 0){
            throw new ResourceNotFoundError()
        }

		return {
			gyms,
		}
	}
}
