import { StatusCode } from "hono/utils/http-status";

/**
 * Represents a response handler class.
 */
export class BedResponse {
    /**
     * Creates an instance of BedResponse.
     * @param {StatusCode} statusCode - The status code of the response.
     * @param {unknown} body - The body of the response.
     */
    constructor(private statusCode: StatusCode, private body: unknown) {}

    /**
     * Retrieves the status code of the response.
     * @returns {StatusCode} The status code of the response.
     */
    getStatusCode(): StatusCode {
        return this.statusCode;
    }

    /**
     * Retrieves the body of the response.
     * @returns {unknown} The body of the response.
     */
    getBody(): unknown {
        return this.body;
    }
}
