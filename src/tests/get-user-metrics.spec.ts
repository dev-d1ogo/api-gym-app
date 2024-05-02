import { expect, describe, it, beforeEach } from "vitest"
import { CheckInsInMemoryRepository } from "../repositories/in-memory/test-check-ins-repository"
import { GetUserMetricsUseCase } from "../use-cases/get-user-metrics-use-case"

// Criando nossos primeiros testes que irao verificar se um requisito esta sendo atentido

// describe -> categoriza testes

let checkInTestRepository: CheckInsInMemoryRepository
let getUserMetrics: GetUserMetricsUseCase


describe("Get user Metrics Use Case", () => {
	beforeEach(async() => {
		checkInTestRepository = new CheckInsInMemoryRepository()
		getUserMetrics= new GetUserMetricsUseCase(
			checkInTestRepository,
		)
	})


	it("should be possible pick up the check-ins number of an user ", async () => {
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
        

		const {checkInsAmount} = await getUserMetrics.getUserMetrics({
			userId: "user-test",
		})

        console.log(checkInTestRepository)
        expect(checkInsAmount).toEqual(2)
		
	})
})
