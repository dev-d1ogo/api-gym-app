import { GymsRepository } from "../repositories/gym-repository"
import { Gym } from "@prisma/client"
import { ResourceNotFoundError } from "./erros/resource-not-found-error"

// Tipagens

interface SearchGymUseCaseRequest {
	query: string // for now by gym name
    page: number
}

interface SearchGymUseCaseResponse {
	gyms: Gym[]
}

export class SearchGymUseCase {
	constructor(private gymRepository: GymsRepository) {}

	async searchGym({
		query,
        page
	}: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
		const gyms = await this.gymRepository.searchManyByQuery(query, page)

        if(gyms.length === 0){
            throw new ResourceNotFoundError()
        }

		return {
			gyms,
		}
	}
}
