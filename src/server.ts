import { prisma } from "../db/prisma";
import { app } from "./app";
import { env } from "./env";

app.listen({
    // Faz com que erros de cors sejam evitados
    host: "0.0.0.0",
    port: env.PORT
}).then(() => {
    console.log("Servidor Iniciado na porta 3030 🚀")
})

