import { expect, describe, it, beforeEach } from "vitest"

import { GymsRepository } from "../repositories/gym-repository"
import { CreateGymUseCase } from "./create-gym-use-case"
import { GymsInMemoryRepository } from "../repositories/in-memory/test-gym-repository"

// Criando nossos primeiros testes que irao verificar se um requisito esta sendo atentido

// Criando previamenente as variaveis para os testes

let testRepository : GymsRepository
let createGymUseCase : CreateGymUseCase

// describe -> categoriza testes

describe("Register User Case", () => {

	// Executando algo previamente antes dos testes -> Nesse caso a instacia das nossas classes 

	beforeEach(() => {
		testRepository = new GymsInMemoryRepository()
		createGymUseCase= new CreateGymUseCase(testRepository)
	})

	it("should be able to register a gym", async () => {
		const { gym } = await createGymUseCase.registerGym({
			title: "Academia do Zé",
            latitude: -10.9573499,
			longitude: -37.0616347,
            description: null,
            phone: null

		})
		
		expect(typeof gym).toEqual("object") 
		expect(typeof gym.title).toEqual(expect.any(String)) 

		console.log(gym)
	})

})
