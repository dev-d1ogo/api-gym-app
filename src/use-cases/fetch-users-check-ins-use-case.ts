import { ResourceNotFoundError } from "./erros/resource-not-found-error"
import { CheckInsRepository } from "../repositories/check-in-repository"
import { CheckIn } from "@prisma/client"

// Tipagem de entrada

interface FetchHistoryUseCaseProps {
	userId: string
}

// Tipagem de saida

interface FetchHistoryUseCaseResponse {
	userCheckIns: CheckIn[]
}

export class FetchHistoryUseCase {
	private checkInsRepository: CheckInsRepository

	constructor(checkInsRepository: CheckInsRepository) {
		this.checkInsRepository = checkInsRepository
	}

	async fetchHistory({
		userId,
	}: FetchHistoryUseCaseProps): Promise<FetchHistoryUseCaseResponse> {
		const userCheckIns = await this.checkInsRepository.findManyByUserId(
			userId
		)

		if (!userCheckIns) {
			throw new ResourceNotFoundError()
		}

		return { userCheckIns }
	}
}
