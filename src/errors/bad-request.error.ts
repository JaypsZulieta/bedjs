import { BedResponse } from "../bed-response";
import { BedResponseBuilder } from "../bed-response-builder";
import { HttpError } from "./http.error";

/**
 * Represents an error indicating a bad request (HTTP 400).
 * @extends HttpError
 */
export class BadRequestError extends HttpError {
    /**
     * Creates an instance of BadRequestError.
     * @param {string} message - The error message.
     */
    constructor(message: string) {
        super(message);
    }

    /**
     * Sends an HTTP response for the bad request error.
     * @returns {Promise<BedResponse>} A promise resolving to the HTTP response.
     */
    async sendResponse(): Promise<BedResponse> {
        const message = this.message;
        return new BedResponseBuilder()
            .statusCode(400)
            .body({ message })
            .build();
    }
}
