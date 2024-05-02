import { expect, describe, it, beforeEach } from "vitest"
import { RegisterUseCase } from "../use-cases/registerUser-use-case"
import { compare } from "bcryptjs"
import { UsersInMemoryRepository } from "../repositories/in-memory/test-users-repository"
import { UserAlreadyExistsError } from "../use-cases/erros/user-already-exists-error"

// Criando nossos primeiros testes que irao verificar se um requisito esta sendo atentido

// Criando previamenente as variaveis para os testes

let testRepository : UsersInMemoryRepository
let registerUseCase : RegisterUseCase

// describe -> categoriza testes

describe("Register User Case", () => {

	// Executando algo previamente antes dos testes -> Nesse caso a instacia das nossas classes 

	beforeEach(() => {
		testRepository = new UsersInMemoryRepository()
		registerUseCase = new RegisterUseCase(testRepository)
	})

	it("should be able to register", async () => {
		const { user } = await registerUseCase.handleCreateNewUser({
			email: "fulano@gmail.com",
			name: "Fulano Juan",
			password: "123456",
		})

		expect(typeof user).toEqual("object") 
		expect(typeof user.email).toEqual(expect.any(String)) 
		expect(typeof user.name).toEqual(expect.any(String))
	})

	it("should apply salt hash in the user password", async () => {
		// Simulando o UserRepository que no caso e o prisma

		const {
			user: { password_hash },
		} = await registerUseCase.handleCreateNewUser({
			email: "fulano@gmail.com",
			name: "Fulano Juan",
			password: "123456",
		})

		// Verificando hash
		const isPasswordCorrectlyHashed = await compare("123456", password_hash)

		expect(isPasswordCorrectlyHashed).toBe(true) // Espera que retorne true a comparacao
	})

	it("should not register an user with same email", async () => {
		const email = "fulano@gmail.com"

		await registerUseCase.handleCreateNewUser({
			name: "Fulano Juan",
			email,
			password: "123456",
		})

		// Testando a duplicacao do email

		// Tratamento com Promisses

		expect(async () => {
			await registerUseCase.handleCreateNewUser({
				name: "Fulano Juan",
				email,
				password: "123456",
			})
		}).rejects.toBeInstanceOf(UserAlreadyExistsError)
	})
})
