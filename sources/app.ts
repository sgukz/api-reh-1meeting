import express from "express"
import Router from "./router"
import * as bodyParser from "body-parser"
import swaggerUi from "swagger-ui-express"
import fileUpload from "express-fileupload"
import * as swaggerDocument from "./openapi.json"

class App {
    private httpServer: any
    constructor(){
        this.httpServer = express();
        this.httpServer.use(bodyParser.urlencoded({ extended:true}))
        this.httpServer.use(bodyParser.json())
        this.httpServer.use(fileUpload({
            createParentPath: true
        }));
        new Router(this.httpServer)
        this.httpServer.use(
            "/swagger",
            swaggerUi.serve,
            swaggerUi.setup(swaggerDocument)
        )
    }
    public Start = (port: number) => {
        return new Promise((resolve, rejects) => {
            this.httpServer
            .listen(port, () => {
                resolve(port)
            })
            .on("error", (error: object) => rejects(error))
        })
    }
}

export default App