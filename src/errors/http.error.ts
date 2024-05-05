import { BedResponse } from "../bed-response";

export abstract class HttpError extends Error {
    constructor(message: string) {
        super(message);
    }
    abstract sendResponse(): BedResponse;
}
