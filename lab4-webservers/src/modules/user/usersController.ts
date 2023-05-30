import {Router} from "express";
import {userService} from "./userService.js";
import httpErrors from 'http-errors';

const {BadRequest, NotFound} = httpErrors;
const router = Router()

//- зробіть ендпоінт "створення користувача" з обов'язковим параметром username і необов'язковим параметром name;
router.post("/", (req, res, next) => {
    const {username, name} = req.body
    try {
        if (!username)
            next(new BadRequest("No username given"))
        else
            res.json(userService.create(username, name))
    } catch (err) {
        next(err)
    }

})

// - зробіть ендпоінт "отримання даних користувача за його id" (id + username + name);
router.get("/:userId", (req, res, next) => {
    try {
        const user = userService.getUser(req.params.userId)
        if (!user)
            next(new NotFound("No such user"))
        else
            res.json(user)
    } catch (err) {
        next(err)
    }
})

// - зробіть ендпоінт "список користувачів" (список записів id + username + name);
router.get("/", (req, res, next) => {
    try {
        res.json(userService.getAllUsers())
    } catch (err) {
        next(err)
    }
})

// - зробіть ендпоінт "оновлення даних користувача за його id";
router.put("/:userId", (req, res, next) => {
    const {username, name} = req.body
    try {
        const user = userService.update(req.params.userId, username, name)
        if (!user)
            next(new NotFound("No such user"))
        else
            res.json(user)
    } catch (err) {
        next(err)
    }
})

// - зробіть ендпоінт "видалення користувача за його id";
router.delete("/:userId", (req, res, next) => {
    try {
        const user = userService.delete(req.params.userId)
        if (!user)
            next(new NotFound("No such user"))
        else
            res.json(user)
    } catch (err) {
        next(err)
    }
})

export const usersController = router
