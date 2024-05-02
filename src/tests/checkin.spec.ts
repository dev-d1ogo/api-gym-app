import { expect, describe, it, beforeEach, vi, afterEach } from "vitest"
import { CheckInsInMemoryRepository } from "../repositories/in-memory/test-check-ins-repository"
import { CheckInUseCase } from "../use-cases/checkin-use-case"
import { GymsInMemoryRepository } from "../repositories/in-memory/test-gym-repository"
import { Decimal } from "@prisma/client/runtime/library"
import { MaxDistanceNumberOfCheckIns } from "../use-cases/erros/max-number-of-check-ins"
import { MaxDistanceReachedError } from "../use-cases/erros/max-distance-reached-error"

// Criando nossos primeiros testes que irao verificar se um requisito esta sendo atentido

// describe -> categoriza testes

let checkInTestRepository: CheckInsInMemoryRepository
let gymTestRepository: GymsInMemoryRepository
let checkInsUseCase: CheckInUseCase

describe("Check-in User Case", () => {
	beforeEach(async() => {
		checkInTestRepository = new CheckInsInMemoryRepository()
		gymTestRepository = new GymsInMemoryRepository()
		checkInsUseCase = new CheckInUseCase(
			checkInTestRepository,
			gymTestRepository
		)
		// Fake gym

		await gymTestRepository.createGym({
			description: "Teste",
			id: "gym-test",
			title: "Erick Juan Academia",
			latitude: new Decimal(-10.9573499),
			longitude: new Decimal(-37.0616347),
			phone: "31231231",
		})

		vi.useFakeTimers() // Mocking das datas
	})

	// Anulando o mocking das datas depois dos testes

	afterEach(() => {
		vi.useRealTimers()
	})

	it("should be possible check in an user at gym  ", async () => {
		// Mocking date
		const mockedDate = new Date(2022, 0, 20, 8, 0, 0)
		vi.setSystemTime(mockedDate)

		const { checkIn } = await checkInsUseCase.checkIn({
			gymId: "gym-test",
			userId: "user-test",
			userLatitude: -10.957349,
			userLongitude: -37.0616347,
		})

		console.log("Essa é a data para testes", checkIn.created_at)

		expect(typeof checkIn).toEqual("object")
		expect(checkIn.id).toEqual(expect.any(String))
	})

	it("should not be possible to check in twice at the same day", async () => {
		await checkInsUseCase.checkIn({
			gymId: "gym-test",
			userId: "user-test",
			userLatitude: -10.9573499,
			userLongitude: -37.0616347,
		})

		expect(async () => {
			await checkInsUseCase.checkIn({
				gymId: "gym-test",
				userId: "user-test",
				userLatitude: -10.9573499,
				userLongitude: -37.0616347,
			})
		}).rejects.toBeInstanceOf(MaxDistanceNumberOfCheckIns)
	})

	it("should be possible to check in at a differents dates", async () => {
		const mockedDate = new Date(2022, 0, 20, 8, 0, 0)
		vi.setSystemTime(mockedDate)

		await checkInsUseCase.checkIn({
			gymId: "gym-test",
			userId: "user-test",
			userLatitude: -10.9573499,
			userLongitude: -37.0616347,
		})

		const otherMockedDate = new Date(2022, 0, 21, 8, 0, 0)
		vi.setSystemTime(otherMockedDate)

		const { checkIn } = await checkInsUseCase.checkIn({
			gymId: "gym-test",
			userId: "user-test",
			userLatitude: -10.9573499,
			userLongitude: -37.0616347,
		})

		expect(typeof checkIn).toEqual("object")
		expect(checkIn.id).toEqual(expect.any(String))
	})

	it("should not be possible check in on distant gym (> 100m)", async () => {
		gymTestRepository.gyms.push({
			description: "Teste",
			id: "gym-test-02",
			title: "Erick Juan Academia",
			latitude: new Decimal(-10.9737188),
			longitude: new Decimal(-37.0384408),
			phone: "31231231",
			created_at: new Date(Date.now())
		})

		// Mocking date

		const mockedDate = new Date(2022, 0, 20, 8, 0, 0)
		vi.setSystemTime(mockedDate)

		expect(async () => {
			await checkInsUseCase.checkIn({
				gymId: "gym-test-02",
				userId: "user-test",
				userLatitude: -10.9573499,
				userLongitude: -37.0616347,
			})
		}).rejects.toBeInstanceOf(MaxDistanceReachedError)


	})
})
