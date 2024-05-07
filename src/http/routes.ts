import { FastifyInstance } from "fastify"
import { registerUser } from "./controllers/register"
import { authenticateUser } from "./controllers/authenticate"
import { profile } from "./controllers/profile"
import { verifyJwt } from "./middleware/verify-jwt"

export async function appRoutes(app: FastifyInstance) {
	app.post("/users", registerUser) // Cria um novo usuario

	app.post("/sessions", authenticateUser) // Autentica e cria uma sessao para o user

	app.get("/me", { onRequest: [verifyJwt] }, profile) // Novo jeito de fazer um interceptor sem ser com o addHook
}
