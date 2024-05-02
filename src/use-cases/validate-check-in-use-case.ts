import { CheckIn } from "@prisma/client"
import { CheckInsRepository } from "../repositories/check-in-repository"
import { ResourceNotFoundError } from "./erros/resource-not-found-error"
import dayjs from "dayjs"
import { TimeToValidateCheckInExcessed } from "./erros/time-to-validate-excessed"

// Tipagem de entrada

interface ValidateCheckInUseCaseProps {
	checkInId: string
}

// Tipagem de saida

interface ValidateCheckInUseCaseResponse {
	validatedCheckIn: CheckIn
}

export class ValidateCheckInUseCase {
	private checkInRepository: CheckInsRepository

	constructor(checkInRepository: CheckInsRepository) {
		this.checkInRepository = checkInRepository
	}

	async validateCheckIn({
		checkInId,
	}: ValidateCheckInUseCaseProps): Promise<ValidateCheckInUseCaseResponse> {
		const checkIn = await this.checkInRepository.findById(checkInId)

        if(!checkIn){
            throw new ResourceNotFoundError()
        }

        const createdDate = dayjs(checkIn.created_at)
        const actualDate = dayjs(new Date())

        const differenceInMinutesBetweenCreatedDate = actualDate.diff(createdDate, "minutes") 

        if(differenceInMinutesBetweenCreatedDate > 20){
            throw new TimeToValidateCheckInExcessed()
        }

        checkIn.validated_at = new Date() // validando o check-in 
        await this.checkInRepository.saveCheckIn(checkIn) // Atualizando o check-in 
		
        return {validatedCheckIn: checkIn}
	}
}
