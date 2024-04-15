import "dotenv/config"

import * as zod from 'zod';

// Validando variaveis ambientes

const envSchema = zod.object({
    NODE_ENV: zod.enum(['dev', 'test', 'production']).default('dev'),
    PORT: zod.coerce.number().default(3030)
});

const _env = envSchema.safeParse(process.env);

if(_env.success === false){
    console.log('Invalid enviroment variables ❌', _env.error.format());

    throw new Error('Invalid enviroment variables')
}


export const env = _env.data;

