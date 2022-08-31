import * as express from "express"
import cors from "cors"
import UserController from "./controllers/users/UserController"
import MeetingController from "./controllers/meetings/MeetingController"
import OneMeetingController from "./controllers/reh-1meeting/OneMeetingController"
require("dotenv").config();
class Router {
    private secretkeyJWT: any
    constructor(server: express.Express) {
        this.secretkeyJWT = process.env.TOKEN_SECRET;
        const router = express.Router()
        UserController(router, this.secretkeyJWT)
        MeetingController(router, this.secretkeyJWT)
        OneMeetingController(router, this.secretkeyJWT)
        router.options("*", cors())
        server.use("/", router)
    }
}

export default Router