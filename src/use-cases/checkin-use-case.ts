import { CheckIn, User } from "@prisma/client"
import { CheckInsRepository } from "../repositories/check-in-repository"
import { GymsRepository } from "../repositories/gym-repository"
import { ResourceNotFoundError } from "./erros/resource-not-found-error"
import { Coordinate, getDistanceBetweenCoordinates } from "../utils/get-distance-between-coordinates"
import { MaxDistanceReachedError } from "./erros/max-distance-reached-error"
import { MaxDistanceNumberOfCheckIns } from "./erros/max-number-of-check-ins"

// Tipagem de entrada

interface CheckInUseCaseProps {
	userId: string,
    gymId: string,
	userLatitude: number,
	userLongitude: number
}

// Tipagem de saida

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}


export class CheckInUseCase {
	private checkInRepository: CheckInsRepository
	private gymRepository: GymsRepository

	constructor(checkInRepository: CheckInsRepository, gymRepository: GymsRepository) {
		this.checkInRepository = checkInRepository
		this.gymRepository = gymRepository
	}

	async checkIn({
		userId,
		gymId,
		userLatitude,
		userLongitude
	}: CheckInUseCaseProps): Promise<CheckInUseCaseResponse> {
		const gym = await this.gymRepository.findById(gymId)

		if(!gym){
			throw new ResourceNotFoundError()
		}

		// calculate distance between user and gym

		const gymCoordinate:Coordinate = {
			latitude: gym.latitude.toNumber(),
			longitude: gym.longitude.toNumber(),
		}

		const userCoordinate:Coordinate = {
			latitude: userLatitude,
			longitude: userLongitude
		}

		const distance = getDistanceBetweenCoordinates(userCoordinate, gymCoordinate)

		const MAX_DISTANCE_IN_KM = 0.1 // 100 m
		if(distance > MAX_DISTANCE_IN_KM){
			throw new MaxDistanceReachedError()
		}

		const alreadyCheckedInThisDate = await this.checkInRepository.findByUserIdOnDate(userId, new Date()) 

		if(alreadyCheckedInThisDate){
			throw new MaxDistanceNumberOfCheckIns()
		}
		
		const checkIn = await this.checkInRepository.createCheckIn({
			gym_id: gymId,
			user_id: userId,
		})
		return {checkIn}
	}
	
}
