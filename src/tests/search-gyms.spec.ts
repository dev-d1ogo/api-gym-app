import { expect, describe, it, beforeEach } from "vitest"

import { GymsRepository } from "../repositories/gym-repository"
import { GymsInMemoryRepository } from "../repositories/in-memory/test-gym-repository"
import { SearchGymUseCase } from "../use-cases/search-gyms-use-case"
import { ResourceNotFoundError } from "../use-cases/erros/resource-not-found-error"
import { title } from "process"

// Criando nossos primeiros testes que irao verificar se um requisito esta sendo atentido

// Criando previamenente as variaveis para os testes

let testRepository: GymsRepository
let searchGymUseCase: SearchGymUseCase

// describe -> categoriza testes

describe("Search Gym By Query Use Case", () => {
	// Executando algo previamente antes dos testes -> Nesse caso a instacia das nossas classes

	beforeEach(() => {
		testRepository = new GymsInMemoryRepository()
		searchGymUseCase = new SearchGymUseCase(testRepository)
	})

	it("should be able to search a gym by name", async () => {
		await testRepository.createGym({
			title: "gym-test",
			latitude: -10.9573499,
			longitude: -37.0616347,
			description: null,
			phone: null,
		})
		await testRepository.createGym({
			title: "gym-test-02",
			latitude: -10.9573499,
			longitude: -37.0616347,
			description: null,
			phone: null,
		})

		const { gyms } = await searchGymUseCase.searchGym({
			page: 1,
			query: "test",
		})

		expect(gyms).toHaveLength(2)

		expect(gyms).toEqual([
			expect.objectContaining({ title: "gym-test" }),
			expect.objectContaining({ title: "gym-test-02" }),
		])
	})

	it("should be able to fetch paginated check-in history with max 20 items per page", async () => {
		for (let i = 1; i <= 22; i++) {
			await testRepository.createGym({
				title: `gym-test-${i}`,
				latitude: -10.9573499,
				longitude: -37.0616347,
				description: null,
				phone: null,
			})
		}

		const {gyms} = await searchGymUseCase.searchGym({
			query: "gym-test",
			page: 2,
		})

		expect(gyms).toHaveLength(2)

        expect(gyms).toEqual([
            expect.objectContaining({title: 'gym-test-21'}),
            expect.objectContaining({title: 'gym-test-22'}),
        ])
	})

	it("should not be able to search a gym by a nonexistent query", async () => {
		await testRepository.createGym({
			title: "gym-test",
			latitude: -10.9573499,
			longitude: -37.0616347,
			description: null,
			phone: null,
		})
		await testRepository.createGym({
			title: "gym-test-02",
			latitude: -10.9573499,
			longitude: -37.0616347,
			description: null,
			phone: null,
		})

		expect(async () => {
			await searchGymUseCase.searchGym({
				page: 1,
				query: "fail-query",
			})
		}).rejects.toBeInstanceOf(ResourceNotFoundError)
	})
})
