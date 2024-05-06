import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { DELETERoute } from "../routes/delete.route";
import { GETRoute } from "../routes/get.route";
import { PATCHRoute } from "../routes/patch.route";
import { POSTRoute } from "../routes/post.route";
import { PUTRoute } from "../routes/put.route";

export class Hammock {
    private GETRoutes: GETRoute[] = [];
    private POSTRoutes: POSTRoute[] = [];
    private PUTRoutes: PUTRoute[] = [];
    private PATCHRoutes: PATCHRoute[] = [];
    private DELETERoutes: DELETERoute[] = [];

    private hono: Hono = new Hono();

    constructor(private port: number) {}

    /**
     * Starts the server and logs a message indicating the server has started.
     * @returns {ServerType} The server instance.
     */
    rest() {
        console.log(`server started on port ${this.port}`);
        return serve({ fetch: this.hono.fetch, port: this.port });
    }

    /**
     * Adds a GET route to the Hammock instance.
     * @param {GETRoute} route - The GET route to add.
     */
    addGETRoute(route: GETRoute): void {
        this.GETRoutes.push(route);
    }

    /**
     * Adds a POST route to the Hammock instance.
     * @param {POSTRoute} route - The POST route to add.
     */
    addPOSTRoute(route: POSTRoute): void {
        this.POSTRoutes.push(route);
    }

    /**
     * Adds a PUT route to the Hammock instance.
     * @param {PUTRoute} route - The PUT route to add.
     */
    addPUTRoute(route: PUTRoute): void {
        this.PUTRoutes.push(route);
    }

    /**
     * Adds a PATCH route to the Hammock instance.
     * @param {PATCHRoute} route - The PATCH route to add.
     */
    addPATCHRoute(route: PATCHRoute): void {
        this.PATCHRoutes.push(route);
    }

    /**
     * Adds a DELETE route to the Hammock instance.
     * @param {DELETERoute} route - The DELETE route to add.
     */
    addDELETERoute(route: DELETERoute): void {
        this.DELETERoutes.push(route);
    }
}
