import { FastifyReply, FastifyRequest } from "fastify"
import { makeGetUserProfileUseCase } from "../../use-cases/factories/make-get-user-profile-use-case"

export async function profile(
	request: FastifyRequest,
	response: FastifyReply
) {	

	const userIdByToken = request.user.sub
	const getUserProfile = makeGetUserProfileUseCase()

	const { user } = await getUserProfile.getProfile({userId: userIdByToken})

	return response.status(200).send({
		user: {
			...user,
			password_hash: undefined
		}
	})
}
