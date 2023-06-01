import {AppDataSource} from "../../data-source.js";
import {User} from "./entity/user.js";

const userRepository = AppDataSource.getRepository(User)

class UserService {
    create(username: string, email: string, age: number, info: string, address: {
        city: string;
        street: string
    }) {
        const user = new User()
        user.username = username
        user.email = email
        user.age = age
        user.info = info
        user.address = address
        return userRepository.save(user)
    }

    getAllUsers() {
        return userRepository.find()
    }

    getUser(id: string) {
        return userRepository.findOneBy({id: id})
    }

    update(id: string, username: string, email: string, age: number, info: string, address: {
        city: string;
        street: string
    }) {
        const user = new User()
        user.username = username
        user.email = email
        user.age = age
        user.info = info
        user.address = address
        return userRepository.update({id: id}, user).then(result => result.affected)
    }

    delete(id: string) {
        return userRepository.delete({id: id}).then(result => result.affected)
    }

    getAllByTitleAgeCityPage(query: {
        title?: string,
        age?: string,
        city?: string,
        page?: string,
        amount?: string
    }) {
        let page = +query.page! || 1
        if (page < 1)
            page = 1
        let amount = +query.amount! || 5
        if (amount < 1)
            amount = 5
        return userRepository.createQueryBuilder("users")
            .leftJoin("posts", "p", "p.userId=users.id")
            .where(query.title ? "p.title=:title" : "true", {title: query.title})
            .andWhere(query.age ? "users.age=:age" : "true", {age: query.age})
            .andWhere(query.city ? "users.address ->> \'city\'=:city" : "true", {city: query.city})
            .addOrderBy("users.id")
            .skip(amount * (page - 1))
            .take(amount)
            .getMany()
    }
}

export const userService = new UserService()
