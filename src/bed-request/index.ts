import { Context } from "hono";
import { JsonObjectParser } from "../json-object-parser";
import { z } from "zod";
import { BadRequestError } from "../errors/bad-request.error";

/**
 * Represents a request handler class.
 */
export class BedRequest {
    /**
     * Creates an instance of BedRequest.
     * @param {Context} context - The context object containing request information.
     */
    constructor(private context: Context) {}

    /**
     * Retrieves the context object containing request information.
     * @returns {Context} The context object.
     */
    getContext(): Context {
        return this.context;
    }

    /**
     * Retrieves the path parameter from the request.
     * @param {string} key - The key of the path parameter.
     * @returns {string} The value of the path parameter.
     */
    getPathParameter(key: string): string {
        return this.context.req.param(key);
    }

    /**
     * Retrieves the query parameter from the request.
     * @param {string} key - The key of the query parameter.
     * @returns {string | undefined} The value of the query parameter, or undefined if not found.
     */

    getQueryParameter(key: string): string | undefined {
        return this.context.req.query(key);
    }

    /**
     * Retrieves the header from the request.
     * @param {string} key - The key of the header.
     * @returns {string | undefined} The value of the header, or undefined if not found.
     */
    getHeader(key: string): string | undefined {
        return this.context.req.header(key);
    }

    /**
     * Retrieves the body from the request.
     * @returns {Promise<JsonObjectParser>} A promise resolving to the parsed JSON body.
     */
    async getBody(): Promise<JsonObjectParser> {
        const body = await this.context.req.json();
        return new JsonObjectParser(body);
    }

    /**
     * Retrieves the path parameter as a number from the request.
     * @param {string} key - The key of the path parameter.
     * @returns {Promise<number>} A promise resolving to the parsed number value of the path parameter.
     * @throws {BadRequestError} Throws when the path parameter is not a valid number.
     */
    async getPathParameterAsNumber(key: string): Promise<number> {
        const value = this.context.req.param(key);
        const parseFailure = !(await z.number().safeParseAsync(value)).success;
        if (parseFailure)
            throw new BadRequestError(`${key} path parameter must be a number`);
        return Number(value);
    }

    /**
     * Retrieves the query parameter as a number from the request.
     * @param {string} key - The key of the query parameter.
     * @returns {Promise<number | undefined>} A promise resolving to the parsed number value of the query parameter, or undefined if not found.
     * @throws {BadRequestError} Throws when the query parameter is not a valid number.
     */
    async getQueryParameterAsNumber(key: string): Promise<number | undefined> {
        const value = this.context.req.query(key);
        const parseFailure = !(await z.number().safeParseAsync(value)).success;
        if (parseFailure)
            throw new BadRequestError(
                `${key} query parameter must be a number`
            );
        return Number(value);
    }
}
