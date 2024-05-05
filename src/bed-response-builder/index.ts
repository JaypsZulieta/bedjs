import { StatusCode } from "hono/utils/http-status";
import { BedResponse } from "../bed-response";

export class BedResponseBuilder {
    private statusCodeAttribute: StatusCode = 200;
    private bodyAttribute: unknown = {};

    statusCode(statusCode: StatusCode): BedResponseBuilder {
        this.statusCodeAttribute = statusCode;
        return this;
    }

    body(body: unknown): BedResponseBuilder {
        this.bodyAttribute = body;
        return this;
    }

    build(): BedResponse {
        return new BedResponse(this.statusCodeAttribute, this.bodyAttribute);
    }
}
