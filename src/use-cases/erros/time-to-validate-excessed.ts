export class TimeToValidateCheckInExcessed extends Error{
    constructor(){
        super("Time to validate check-in could not be bigger than 20 minutes")
    }
}