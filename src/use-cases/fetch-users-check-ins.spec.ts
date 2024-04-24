import { expect, describe, it, beforeEach } from "vitest"
import { CheckInsInMemoryRepository } from "../repositories/in-memory/test-check-ins-repository"
import { FetchHistoryUseCase } from "./fetch-users-check-ins-use-case"
import { randomUUID } from "crypto"

// Criando nossos primeiros testes que irao verificar se um requisito esta sendo atentido

// describe -> categoriza testes

let checkInTestRepository: CheckInsInMemoryRepository
let fetchHistoryUseCase: FetchHistoryUseCase


describe("Fetch history of user check-ins Use Case", () => {
	beforeEach(async() => {
		checkInTestRepository = new CheckInsInMemoryRepository()
		fetchHistoryUseCase= new FetchHistoryUseCase(
			checkInTestRepository,
		)
	})


	it("should be possible pick up the history of user check-ins ", async () => {
        await checkInTestRepository.createCheckIn({
            gym_id: 'gym-test-01',
            user_id: 'user-test',
            created_at: new Date(Date.now()),
        })
        await checkInTestRepository.createCheckIn({
            gym_id: 'gym-test-02',
            user_id: 'user-test',
            created_at: new Date(Date.now()),
        })

		const { userCheckIns }  = await fetchHistoryUseCase.fetchHistory({
			userId: "user-test",
		})


		expect(userCheckIns).toEqual([
            expect.objectContaining({gym_id: 'gym-test-01'}) && expect.objectContaining({user_id: 'user-test'}),
            expect.objectContaining({gym_id: 'gym-test-02'}) && expect.objectContaining({user_id: 'user-test'})

        ])
        expect(userCheckIns).toHaveLength(2)
		
	})

})
