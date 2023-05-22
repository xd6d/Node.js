import {UserDto} from "./dto/user.js";
import {UserEntity} from "./entity/user.js";
import {users} from "../../database.js";
import {v4} from 'uuid'

class UsersRepository {
    create(dto: UserDto) {
        const user: UserEntity = {id: v4(), ...dto}
        users.push(user)
        return user
    }

    getAllUsers() {
        return users
    }

    getUser(id: string) {
        let user = undefined
        for (let i = 0; i < users.length; i++)
            if (users[i].id === id) {
                user = users[i]
                break
            }
        return user
    }

    delete(id: string) {
        const user = this.getUser(id)
        if (user)
            users.splice(users.indexOf(user), 1)
        return user
    }
}

export const usersRepository = new UsersRepository()
