import { BedResponse } from "../bed-response";
import { BedResponseBuilder } from "../bed-response-builder";
import { HttpError } from "./http.error";

export class ForbiddenError extends HttpError {
    constructor(message: string) {
        super(message);
    }

    async sendResponse(): Promise<BedResponse> {
        const message = this.message;
        return new BedResponseBuilder()
            .statusCode(403)
            .body({ message })
            .build();
    }
}
