import {usersRepository} from "./usersRepository.js";
import {UserDto} from "./dto/user.js";


class UserService {
    create(username: string, name?: string) {
        return usersRepository.create(new UserDto(username, name || username))
    }

    getAllUsers() {
        return usersRepository.getAllUsers()
    }

    getUser(id: string) {
        return usersRepository.getUser(id)
    }

    update(id: string, username?: string, name?: string) {
        const user = this.getUser(id)
        if (user) {
            if (username)
                user.username = username
            if (name)
                user.name = name
        }
        return user
    }

    delete(id: string) {
        return usersRepository.delete(id)
    }
}

export const userService = new UserService()
