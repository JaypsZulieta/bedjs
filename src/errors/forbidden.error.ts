import { BedResponse } from "../bed-response";
import { BedResponseBuilder } from "../bed-response-builder";
import { HttpError } from "./http.error";

/**
 * Represents an error indicating a forbidden request (HTTP 403).
 * @extends HttpError
 */
export class ForbiddenError extends HttpError {
    /**
     * Creates an instance of ForbiddenError.
     * @param {string} message - The error message.
     */
    constructor(message: string) {
        super(message);
    }

    /**
     * Sends an HTTP response for the forbidden error.
     * @returns {Promise<BedResponse>} A promise resolving to the HTTP response.
     */
    async sendResponse(): Promise<BedResponse> {
        const message = this.message;
        return new BedResponseBuilder()
            .statusCode(403)
            .body({ message })
            .build();
    }
}
