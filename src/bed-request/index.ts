import { Context } from "hono";
import { JsonObjectParser } from "../json-object-parser";
import { z } from "zod";
import { BadRequestError } from "../errors/bad-request.error";

export class BedRequest {
    constructor(private context: Context) {}

    getPathParameter(key: string): string {
        return this.context.req.param(key);
    }

    getQueryParameter(key: string): string | undefined {
        return this.context.req.query(key);
    }

    getHeader(key: string): string | undefined {
        return this.context.req.header(key);
    }

    async getBody(): Promise<JsonObjectParser> {
        const body = await this.context.req.json();
        return new JsonObjectParser(body);
    }

    async getPathParameterAsNumber(key: string): Promise<number> {
        const value = this.context.req.param(key);
        const parseFailure = !(await z.number().safeParseAsync(value)).success;
        if (parseFailure)
            throw new BadRequestError(`${key} path parameter must be a number`);
        return Number(value);
    }

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
