import {Server} from "./server.js";
import * as dotenv from 'dotenv'

dotenv.config()

const instance = new Server()

instance.start()
