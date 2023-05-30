import {UserDto} from "./dto/user.js";
import {UserEntity} from "./entity/user.js";
import {users} from "../../database.js";
import * as crypto from "crypto";

class UsersRepository {
    create(dto: UserDto) {
        const user: UserEntity = {id: crypto.randomUUID(), ...dto}
        users.push(user)
        return user
    }

    getAllUsers() {
        return users
    }

    getUser(id: string) {
        return users.find(user => user.id === id)
    }

    delete(id: string) {
        const user = this.getUser(id)
        if (user)
            users.splice(users.indexOf(user), 1)
        return user
    }
}

export const usersRepository = new UsersRepository()
