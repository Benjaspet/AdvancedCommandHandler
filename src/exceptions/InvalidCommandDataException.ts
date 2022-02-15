export class InvalidCommandDataException extends Error {
    constructor() {
        super("An invalid command object was created. Check to see if you have all required parameters.");
    }
}