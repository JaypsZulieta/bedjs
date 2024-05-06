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

    constructor(private port: number) {}
}
