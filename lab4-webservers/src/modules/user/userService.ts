import {usersRepository} from "./usersRepository.js";
import {UserDto} from "./dto/user.js";
import httpErrors from 'http-errors';

const {BadRequest} = httpErrors;

class UserService {
    create(username: string, name?: string) {
        if (!username)
            throw new BadRequest("No username given")
        const dto = new UserDto(username, name || username)
        return usersRepository.create(dto)
    }

    getAllUsers() {
        return usersRepository.getAllUsers()
    }

    getUser(id: string) {
        const user = usersRepository.getUser(id)
        if (!user) {
            throw new BadRequest("No such user")
        }
        return user
    }

    update(id: string, username?: string, name?: string) {
        const user = this.getUser(id)
        if (username)
            user.username = username
        if (name)
            user.name = name
        return user
    }

    delete(id: string) {
        const user = usersRepository.delete(id)
        if (!user) {
            throw new BadRequest("No such user")
        }
        return user
    }
}

export const userService = new UserService()
