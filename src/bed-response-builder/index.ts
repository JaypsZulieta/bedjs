import { StatusCode } from "hono/utils/http-status";
import { BedResponse } from "../bed-response";

/**
 * Represents a builder for creating BedResponse objects.
 */
export class BedResponseBuilder {
    private statusCodeAttribute: StatusCode = 200;
    private bodyAttribute: unknown = {};

    /**
     * Sets the status code for the response.
     * @param {StatusCode} statusCode - The status code to set.
     * @returns {BedResponseBuilder} The current instance of BedResponseBuilder for method chaining.
     */
    statusCode(statusCode: StatusCode): BedResponseBuilder {
        this.statusCodeAttribute = statusCode;
        return this;
    }

    /**
     * Sets the body for the response.
     * @param {unknown} body - The body to set.
     * @returns {BedResponseBuilder} The current instance of BedResponseBuilder for method chaining.
     */
    body(body: unknown): BedResponseBuilder {
        this.bodyAttribute = body;
        return this;
    }

    /**
     * Builds a BedResponse object with the configured status code and body.
     * @returns {BedResponse} The constructed BedResponse object.
     */
    build(): BedResponse {
        return new BedResponse(this.statusCodeAttribute, this.bodyAttribute);
    }
}
