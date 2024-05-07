import { FastifyReply, FastifyRequest } from "fastify"

export async function verifyJwt(
	request: FastifyRequest,
	response: FastifyReply
) {
try {
    await request.jwtVerify() // Verifica se o token está no cabeçalho
} catch (error) {
    return response.status(401).send({message: "Unauthorized for this action"})
}
}
