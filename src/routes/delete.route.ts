import { BedRequest } from "../bed-request";
import { BedResponse } from "../bed-response";
import { HttpRoute } from "./http.route";

/**
 * Represents a DELETE route extending the HTTP route interface.
 * @interface
 * @extends HttpRoute
 */

export interface DELETERoute extends HttpRoute {
    /**
     * Handles DELETE requests and returns a response.
     * @param {BedRequest} request - The request object.
     * @returns {Promise<BedResponse>} A promise that resolves to the response object.
     */
    DELETE(request: BedRequest): Promise<BedResponse>;
}
