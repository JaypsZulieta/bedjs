import { BedRequest } from "../bed-request";
import { BedResponse } from "../bed-response";
import { HttpRoute } from "./http.route";

/**
 * Represents a PATCH route extending the HTTP route interface.
 * @interface
 * @extends HttpRoute
 */
export interface PATCHRoute extends HttpRoute {
    /**
     * Handles PATCH requests and returns a response.
     * @param {BedRequest} request - The request object.
     * @returns {Promise<BedResponse>} A promise that resolves to the response object.
     */
    PATCH(request: BedRequest): Promise<BedResponse>;
}
