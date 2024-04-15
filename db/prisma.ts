import { PrismaClient } from "@prisma/client";
import { env } from "../src/env";

export const prisma = new PrismaClient({
    //Fazendo com que em desenvolvimento todas as selects sejam feitas
    log: env.NODE_ENV === 'dev' ? ['query'] : []
});