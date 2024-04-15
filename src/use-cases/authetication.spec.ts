import { expect, describe, it, beforeEach } from "vitest"
import { hash } from "bcryptjs"
import { UsersInMemoryRepository } from "../repositories/in-memory/test-users-repository"
import { AutenticationUseCase } from "./authentication-use-case"
import { InvalidCredentialsError } from "./erros/invalid-credentials-error"

// Criando nossos primeiros testes que irao verificar se um requisito esta sendo atentido

// describe -> categoriza testes

let testRepository: UsersInMemoryRepository
let authenticateUseCase: AutenticationUseCase

describe("Authenticate User Case", () => {
	beforeEach(() => {
		testRepository = new UsersInMemoryRepository()
		authenticateUseCase = new AutenticationUseCase(testRepository)
	})

	it("should be able to login", async () => {
		await testRepository.createUser({
			id: "user-1",
			name: "Fulano",
			email: "fulano@gmail.com",
			password_hash: await hash("123456", 6),
			created_at: new Date(),
		})

		const { user } = await authenticateUseCase.authenticate({
			email: "fulano@gmail.com",
			password: "123456",
		})

		expect(typeof user).toEqual("object")
		expect(typeof user.email).toEqual(expect.any(String))
		expect(typeof user.name).toEqual(expect.any(String))
	})

	it("shouldn't be able to login with wrong password", async () => {
	
		await testRepository.createUser({
			id: "user-1",
			name: "Fulano",
			email: "fulano@gmail.com",
			password_hash: await hash("123456", 6),
			created_at: new Date(),
		})

		expect(
			async () =>
				await authenticateUseCase.authenticate({
					email: "fulano@gmail.com",
					password: "1234561",
				})
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it("shouldn't be able to login with wrong email", async () => {
		
		await testRepository.createUser({
			id: "user-1",
			name: "Fulano",
			email: "fulano@gmail.com",
			password_hash: await hash("123456", 6),
			created_at: new Date(),
		})

		expect(
			async () =>
				await authenticateUseCase.authenticate({
					email: "fulaninho@gmail.com",
					password: "123456",
				})
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
