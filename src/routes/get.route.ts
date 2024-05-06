import { BedRequest } from "../bed-request";
import { BedResponse } from "../bed-response";
import { HttpRoute } from "./http.route";

/**
 * Represents a GET route extending the HTTP route interface.
 * @interface
 * @extends HttpRoute
 */
export interface GETRoute extends HttpRoute {
    /**
     * Handles GET requests and returns a response.
     * @param {BedRequest} request - The request object.
     * @returns {Promise<BedResponse>} A promise that resolves to the response object.
     */
    GET(request: BedRequest): Promise<BedResponse>;
}
