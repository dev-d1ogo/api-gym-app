import { ResourceNotFoundError } from "./erros/resource-not-found-error"
import { CheckInsRepository } from "../repositories/check-in-repository"
import { CheckIn } from "@prisma/client"

// Tipagem de entrada

interface GetUserMetricsUseCaseProps {
	userId: string
}

// Tipagem de saida

interface GetUserMetricsUseCaseResponse {
	checkInsAmount: number
}

export class GetUserMetricsUseCase {
	private checkInsRepository: CheckInsRepository

	constructor(checkInsRepository: CheckInsRepository) {
		this.checkInsRepository = checkInsRepository
	}

	async getUserMetrics({
		userId,
	}: GetUserMetricsUseCaseProps): Promise<GetUserMetricsUseCaseResponse> {
		const userCheckIns = await this.checkInsRepository.countByUserId(
			userId
		)

		if (!userCheckIns) {
			throw new ResourceNotFoundError()
		}

		return {
            checkInsAmount: userCheckIns
        } 
	}
}
