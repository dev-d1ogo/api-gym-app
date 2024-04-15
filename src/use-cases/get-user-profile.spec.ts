import { expect, describe, it, beforeEach } from "vitest"
import { hash } from "bcryptjs"
import { UsersInMemoryRepository } from "../repositories/in-memory/test-users-repository"
import { InvalidCredentialsError } from "./erros/invalid-credentials-error"
import { GetProfileUseCase } from "./get-user-profile-use-case"
import { ResourceNotFoundError } from "./erros/resource-not-found-error"

// Criando nossos primeiros testes que irao verificar se um requisito esta sendo atentido

// describe -> categoriza testes

let testRepository: UsersInMemoryRepository
let getProfileUseCase: GetProfileUseCase

describe("Authenticate User Case", () => {
	beforeEach(() => {
		testRepository = new UsersInMemoryRepository()
		getProfileUseCase = new GetProfileUseCase(testRepository)
	})

	it("should be get user profile details", async () => {
		const createdUser = await testRepository.createUser({
			id: "user-1",
			name: "Fulano",
			email: "fulano@gmail.com",
			password_hash: await hash("123456", 6),
			created_at: new Date(),
		})

		const { user } = await getProfileUseCase.getProfile({UserId: createdUser.id})

		expect(typeof user).toEqual("object")
		expect(user.email).toEqual("fulano@gmail.com")
		expect(user.name).toEqual("Fulano")
	})

	it("should'nt be get user profile details with invalid id", async () => {
		await testRepository.createUser({
			id: "user-1",
			name: "Fulano",
			email: "fulano@gmail.com",
			password_hash: await hash("123456", 6),
			created_at: new Date(),
		})


		expect(
			async () =>
				await getProfileUseCase.getProfile({
					UserId: "user-teste"
				})
		).rejects.toBeInstanceOf(ResourceNotFoundError)
	})
})
