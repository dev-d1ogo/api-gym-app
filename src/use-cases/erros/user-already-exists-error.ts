export class UserAlreadyExistsError extends Error{
    constructor(){
        super("The e-mail already exists")
    }
}