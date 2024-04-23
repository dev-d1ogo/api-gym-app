export class MaxDistanceNumberOfCheckIns extends Error{
    constructor(){
        super("Check-in has already been done in this date. Wait even tomorrow")
    }
}