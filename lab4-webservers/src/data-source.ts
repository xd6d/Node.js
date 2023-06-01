import {DataSource} from "typeorm";
import * as dotenv from 'dotenv'
import {User} from "./modules/user/entity/user.js";
import {Post} from "./modules/post/entity/post.js";

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.postgres_host,
    port: +process.env.postgres_port! || 5432,
    username: process.env.postgres_username,
    password: process.env.postgres_password,
    database: process.env.postgres_database,
    synchronize: false,
    logging: ["error", "warn", "info"],
    entities: [User, Post],
    migrations: ['./migrations/**/*.ts']
})

AppDataSource.initialize()
