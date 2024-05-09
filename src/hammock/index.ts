import { Hono, Context } from "hono";
import { serve } from "@hono/node-server";
import { DELETERoute } from "../routes/delete.route";
import { GETRoute } from "../routes/get.route";
import { PATCHRoute } from "../routes/patch.route";
import { POSTRoute } from "../routes/post.route";
import { PUTRoute } from "../routes/put.route";
import { BedRequest } from "../bed-request";
import { HttpError } from "../errors/http.error";

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
        this.initializeGETRoutes();
        this.initializePOSTRoutes();
        this.initializePUTRoutes();
        this.initializePATCHRoutes();
        this.initializeDELETERoutes();
        this.initializeErrorHandling();
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

    /**
     * Initializes GET routes for the API.
     */
    private initializeGETRoutes(): void {
        this.GETRoutes.forEach((route) => {
            this.hono.get(route.getURI(), async (context: Context) => {
                const response = await route.GET(new BedRequest(context));
                context.status(response.getStatusCode());
                return context.json(response.getBody());
            });
        });
    }

    /**
     * Initializes POST routes for the API.
     */
    private initializePOSTRoutes(): void {
        this.POSTRoutes.forEach((route) => {
            this.hono.post(route.getURI(), async (context: Context) => {
                const response = await route.POST(new BedRequest(context));
                context.status(response.getStatusCode());
                return context.json(response.getBody());
            });
        });
    }

    /**
     * Initializes PUT routes for the API.
     */
    private initializePUTRoutes(): void {
        this.PUTRoutes.forEach((route) => {
            this.hono.put(route.getURI(), async (context: Context) => {
                const response = await route.PUT(new BedRequest(context));
                context.status(response.getStatusCode());
                return context.json(response.getBody());
            });
        });
    }

    /**
     * Initializes PATCH routes for the API.
     */
    private initializePATCHRoutes(): void {
        this.PATCHRoutes.forEach((route) => {
            this.hono.patch(route.getURI(), async (context: Context) => {
                const response = await route.PATCH(new BedRequest(context));
                context.status(response.getStatusCode());
                return context.json(response.getBody());
            });
        });
    }

    /**
     * Initializes DELETE routes for the API.
     */
    private initializeDELETERoutes(): void {
        this.DELETERoutes.forEach((route) => {
            this.hono.delete(route.getURI(), async (context: Context) => {
                const response = await route.DELETE(new BedRequest(context));
                context.status(response.getStatusCode());
                return context.json(response.getBody());
            });
        });
    }

    /**
     * Initializes the error handling for the API.
     */
    private initializeErrorHandling(): void {
        this.hono.onError(async (error: Error, context: Context) => {
            if (error instanceof HttpError) {
                const response = await error.sendResponse();
                context.status(response.getStatusCode());
                return context.json(response.getBody());
            }
            context.status(500);
            console.error(error);
            return context.json({ message: "server error" });
        });
    }
}
