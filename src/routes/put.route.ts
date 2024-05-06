import { BedRequest } from "../bed-request";
import { BedResponse } from "../bed-response";
import { HttpRoute } from "./http.route";

/**
 * Represents a PUT route extending the HTTP route interface.
 * @interface
 * @extends HttpRoute
 */
export interface PUTRoute extends HttpRoute {
    /**
     * Handles PUT requests and returns a response.
     * @param {BedRequest} request - The request object.
     * @returns {Promise<BedResponse>} A promise that resolves to the response object.
     */
    PUT(request: BedRequest): Promise<BedResponse>;
}
