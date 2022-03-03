export class RestPutException extends Error {
    constructor() {
        super("Unable to update application commands.");
    }
}