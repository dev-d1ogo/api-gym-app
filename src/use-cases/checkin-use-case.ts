import { CheckIn, User } from "@prisma/client"
import { CheckInsRepository } from "../repositories/check-in-repository"

// Tipagem de entrada

interface CheckInUseCaseProps {
	userId: string,
    gymId: string,
}

// Tipagem de saida

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}


export class CheckInUseCase {
	private checkInRepository: CheckInsRepository

	constructor(checkInRepository: CheckInsRepository) {
		this.checkInRepository = checkInRepository
	}

	async checkIn({
		userId,
		gymId,
	}: CheckInUseCaseProps): Promise<CheckInUseCaseResponse> {
		// Verificando se há um checkIn 
		const alreadyCheckedInThisDate = await this.checkInRepository.findByUserIdOnDate(userId, new Date())

		if(alreadyCheckedInThisDate){
			throw new Error("Check-In já criado")
		}
		
		const checkIn = await this.checkInRepository.createCheckIn({
			gym_id: gymId,
			user_id: userId,
		})
		return {checkIn}
	}
	
}
