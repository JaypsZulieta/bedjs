/**
 * Represents an HTTP route.
 * @interface
 */
export interface HttpRoute {
    /**
     * Gets the Uniform Resource Identifier (URI) of the HTTP route.
     * @returns {string} The URI of the HTTP route.
     */
    getURI(): string;
}
