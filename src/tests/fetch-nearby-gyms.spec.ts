import { expect, describe, it, beforeEach } from "vitest"

import { GymsRepository } from "../repositories/gym-repository"
import { GymsInMemoryRepository } from "../repositories/in-memory/test-gym-repository"
import { ResourceNotFoundError } from "../use-cases/erros/resource-not-found-error"
import { FetchNearbyGymsUseCase } from "../use-cases/fetch-nearby-gyms-use-case"

// Criando nossos primeiros testes que irao verificar se um requisito esta sendo atentido

// Criando previamenente as variaveis para os testes

let testRepository: GymsRepository
let fetchNearbyGyms: FetchNearbyGymsUseCase

// describe -> categoriza testes

describe("Fetch Nearby Gyms Use Case", () => {
	// Executando algo previamente antes dos testes -> Nesse caso a instacia das nossas classes

	beforeEach(() => {
		testRepository = new GymsInMemoryRepository()
		fetchNearbyGyms = new FetchNearbyGymsUseCase(testRepository)
	})

	it("should be able to fetch nearby gyms", async () => {
		await testRepository.createGym({
			title: "near gym",
			latitude: -10.9573499,
			longitude: -37.0616347,
			description: null,
			phone: null,
		})
		await testRepository.createGym({
			title: "far-gym",
			latitude: -10.9573499,
			longitude: -37.1936347,
			description: null,
			phone: null,
		})

		const { gyms } = await fetchNearbyGyms.fetchNearbyGyms({
			userLatitude: -10.9573499,
            userLongitude: -37.0616347
		})

		expect(gyms).toHaveLength(1)

		expect(gyms).toEqual([
			expect.objectContaining({ title: "near gym" }),
		])
	})


})
