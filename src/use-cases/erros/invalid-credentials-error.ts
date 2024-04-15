export class InvalidCredentialsError extends Error{
    constructor(){
        super("Usuario não cadastrado")
    }
}