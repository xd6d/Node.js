import pgp from 'pg-promise'
import * as dotenv from 'dotenv'

dotenv.config()

export const db = pgp()(`postgres://${process.env.postgres_username}:${process.env.postgres_password}@${process.env.postgres_host}:${process.env.postgres_port}/${process.env.postgres_database}`)
