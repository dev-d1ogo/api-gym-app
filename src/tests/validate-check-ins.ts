import { expect, describe, it, beforeEach, vi, afterEach } from "vitest"
import { CheckInsInMemoryRepository } from "../repositories/in-memory/test-check-ins-repository"
import { ValidateCheckInUseCase } from "../use-cases/validate-check-in-use-case"
import exp from "constants"
import { ResourceNotFoundError } from "../use-cases/erros/resource-not-found-error"
import { TimeToValidateCheckInExcessed } from "../use-cases/erros/time-to-validate-excessed"

let checkInTestRepository: CheckInsInMemoryRepository
let checkInsUseCase: ValidateCheckInUseCase

describe("Validate Check-in User Case", () => {
	beforeEach(async () => {
		checkInTestRepository = new CheckInsInMemoryRepository()
		checkInsUseCase = new ValidateCheckInUseCase(checkInTestRepository)

		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it("should be able validate check-in ", async () => {
		const createdcheckIn = await checkInTestRepository.createCheckIn({
			gym_id: "gym-test",
			user_id: "user-test",
		})

		const { validatedCheckIn } = await checkInsUseCase.validateCheckIn({
			checkInId: "gym-test",
		})

		expect(validatedCheckIn.validated_at).toEqual(expect.any(Date))
		expect(checkInTestRepository.checkins[0].validated_at).toEqual(
			expect.any(Date)
		)
	})

	it("should not be able validate inexistent check-in ", async () => {
		await expect(() => {
			checkInsUseCase.validateCheckIn({
				checkInId: "inexistent-gym",
			})
		}).rejects.toBeInstanceOf(ResourceNotFoundError)
	})

	it("should not be possible validate any check 20 minutes after of its creation", async () => {
		const mockedDate = new Date(2023, 0, 20, 8, 13, 40)

		vi.setSystemTime(mockedDate)

		const createdcheckIn = await checkInTestRepository.createCheckIn({
			gym_id: "gym-test",
			user_id: "user-test",
		})

		// Avançando no tempo com o mocking do vitest

		vi.advanceTimersByTime(1000 * 60 * 30) // 30 minutos

		await expect(() => {
			checkInsUseCase.validateCheckIn({
				checkInId: "inexistent-gym",
			})
		}).rejects.toBeInstanceOf(TimeToValidateCheckInExcessed)
	})
})
