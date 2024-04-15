import { FastifyInstance } from "fastify";
import { registerUser } from "./controllers/register";
import { authenticateUser } from "./controllers/authenticate";

export async function appRoutes(app:FastifyInstance){
    app.post("/users", registerUser) // Cria um novo usuario

    app.post("/sessions", authenticateUser) // Autentica e cria uma sessao para o user
}