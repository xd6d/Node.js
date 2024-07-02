import express, {NextFunction, Request, Response} from 'express'
import {HttpError} from 'http-errors'
import {usersController} from "./modules/user/usersController.js";
import bp from 'body-parser'

export class Server {
    private app = express();
    private port = +(process.env.port||3000)

    start() {
        this.initBodyParser()
        this.initRoutes()
        this.initErrorHandling()
        this.listenPort(this.port)
    }

    private initRoutes() {
        this.app.use("/users/", usersController);
    }

    private initErrorHandling() {
        this.app.use(
            (err: Error, req: Request, res: Response, next: NextFunction) => {
                let statusCode = 500;
                if (err instanceof HttpError)
                    statusCode = err.status
                res.status(statusCode).send({
                    message: err.message,
                    status: statusCode,
                });
            }
        );
    }

    private listenPort(port: number) {
        this.app.listen(port, () => console.log("Server is up on port", port))
    }

    private initBodyParser() {
        this.app.use(bp.json())
    }
}
