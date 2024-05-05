import { StatusCode } from "hono/utils/http-status";

export class BedResponse {
    constructor(private statusCode: StatusCode, private body: unknown) {}

    getStatusCode(): StatusCode {
        return this.statusCode;
    }
    getBody(): unknown {
        return this.body;
    }
}
