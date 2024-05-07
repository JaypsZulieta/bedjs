import { StatusCode } from "hono/utils/http-status";

/**
 * Represents a response handler class.
 */
export class BedResponse {
    /**
     * Creates an instance of BedResponse.
     * @param {StatusCode} statusCode - The status code of the response.
     * @param {any} body - The body of the response.
     */
    constructor(private statusCode: StatusCode, private body: any) {}

    /**
     * Retrieves the status code of the response.
     * @returns {StatusCode} The status code of the response.
     */
    getStatusCode(): StatusCode {
        return this.statusCode;
    }

    /**
     * Retrieves the body of the response.
     * @returns {any} The body of the response.
     */
    getBody(): any {
        return this.body;
    }
}
