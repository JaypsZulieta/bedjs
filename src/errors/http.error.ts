import { BedResponse } from "../bed-response";

/**
 * Represents an abstract HTTP error class.
 * @extends Error
 */
export abstract class HttpError extends Error {
    /**
     * Creates an instance of HttpError.
     * @param {string} message - The error message.
     */
    constructor(message: string) {
        super(message);
    }

    /**
     * Abstract method to send an HTTP response.
     * @abstract
     * @returns {Promise<BedResponse>} A promise resolving to the HTTP response.
     */
    abstract sendResponse(): Promise<BedResponse>;
}
