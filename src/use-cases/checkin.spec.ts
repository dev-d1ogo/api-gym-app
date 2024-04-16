import { expect, describe, it, beforeEach, vi, afterEach } from "vitest"
import { CheckInsInMemoryRepository } from "../repositories/in-memory/test-check-ins-repository"
import { CheckInUseCase } from "./checkin-use-case"

// Criando nossos primeiros testes que irao verificar se um requisito esta sendo atentido

// describe -> categoriza testes

let testRepository: CheckInsInMemoryRepository
let checkInsUseCase: CheckInUseCase

describe("Check-in User Case", () => {
	beforeEach(() => {
		testRepository = new CheckInsInMemoryRepository()
		checkInsUseCase = new CheckInUseCase(testRepository)

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
            userId: "user-test"
        })

        console.log("Essa é a data para testes", checkIn.created_at)

        expect(typeof checkIn).toEqual("object")
        expect(checkIn.id).toEqual(expect.any(String))
	})

    it("should not be possible to check in twice at the same day", async () => {
        await checkInsUseCase.checkIn({
            gymId: "gym-test",
            userId: "user-test"
        })

        expect(async()=>{
            await checkInsUseCase.checkIn({
                gymId: "gym-test",
                userId: "user-test"
            })
        }).rejects.toBeInstanceOf(Error)
	})

    it("should be possible to check in at a differents dates", async () => {
        const mockedDate = new Date(2022, 0, 20, 8, 0, 0)
        vi.setSystemTime(mockedDate)

        await checkInsUseCase.checkIn({
            gymId: "gym-test",
            userId: "user-test"
        })

        const otherMockedDate = new Date(2022, 0, 21, 8, 0, 0)
        vi.setSystemTime(otherMockedDate)

        const {checkIn} = await checkInsUseCase.checkIn({
            gymId: "gym-test",
            userId: "user-test"
        })

        expect(typeof checkIn).toEqual("object")
        expect(checkIn.id).toEqual(expect.any(String))
	})
})
