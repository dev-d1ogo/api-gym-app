import { expect, describe, it, beforeEach } from "vitest"
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
	})

	it("should be possible check in an user at gym  ", async () => {
        const { checkIn } = await checkInsUseCase.checkIn({
            gymId: "gym-test",
            userId: "user-test"
        })

        expect(typeof checkIn).toEqual("object")
        expect(checkIn.id).toEqual(expect.any(String))
	})
})
