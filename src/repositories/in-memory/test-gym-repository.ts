import { Gym, Prisma } from "@prisma/client"
import {
	GymsRepository,
	findManyByUserCoordinateParams,
} from "../gym-repository"
import { randomUUID } from "crypto"
import { getDistanceBetweenCoordinates } from "../../utils/get-distance-between-coordinates"

// Simulando nosso banco de dados

export class GymsInMemoryRepository implements GymsRepository {
	public gyms: Gym[] = []

	async createGym(data: Prisma.GymCreateInput) {
		const gym = {
			id: data.id ?? randomUUID(),
			title: data.title,
			description: data.description,
			latitude: new Prisma.Decimal(data.latitude.toString()),
			longitude: new Prisma.Decimal(data.longitude.toString()),
			phone: data.phone,
			created_at: new Date(),
		}

		this.gyms.push(gym)

		return gym
	}

	async findById(id: string) {
		const gym = this.gyms.find((gym) => id === gym.id)

		if (!gym) {
			return null
		}

		return gym
	}

	async searchManyByQuery(query: string, page: number): Promise<Gym[]> {
		const gyms = this.gyms
			.filter((item) => item.title.includes(query))
			.slice((page - 1) * 20, page * 20) // pagination

		return gyms
	}

	async findManyByUserCoordinate({
		userLatitude,
		userLongitude,
	}: findManyByUserCoordinateParams): Promise<Gym[]> {
		const nearbyGyms = this.gyms.filter((gym) => {
			const userCoordinates = {
				latitude: userLatitude,
				longitude: userLongitude,
			}

			const gymCoordinates = {
				latitude: gym.latitude.toNumber(),
				longitude: gym.longitude.toNumber(),
			}

			const distance = getDistanceBetweenCoordinates(
				userCoordinates,
				gymCoordinates
			)
			
			return distance < 10
		})
		return nearbyGyms
	}
}
