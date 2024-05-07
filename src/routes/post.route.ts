import { BedRequest } from "../bed-request";
import { BedResponse } from "../bed-response";
import { HttpRoute } from "./http.route";

/**
 * Represents a POST route extending the HTTP route interface.
 * @interface
 * @extends HttpRoute
 */
export interface POSTRoute extends HttpRoute {
    /**
     * Handles POST requests and returns a response.
     * @param {BedRequest} request - The request object.
     * @returns {Promise<BedResponse>} A promise that resolves to the response object.
     */
    POST(request: BedRequest): Promise<BedResponse>;
}
