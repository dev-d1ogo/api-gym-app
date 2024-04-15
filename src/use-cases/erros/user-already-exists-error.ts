export class UserAlreadyExistsError extends Error{
    constructor(){
        super("O E-mail já existe")
    }
}