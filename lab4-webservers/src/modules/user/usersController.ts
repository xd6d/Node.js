import {Router} from "express";
import {userService} from "./userService.js";
import httpErrors from "http-errors";

const {NotFound, BadRequest} = httpErrors

const router = Router()

router.get("/", async (req, res, next) => {
    try {
        res.json(await userService.getAllByTitleAgeCityPage(req.query))
    } catch (err) {
        next(err)
    }
})

router.get("/:userId", async (req, res, next) => {
    try {
        const user = await userService.getUser(req.params.userId)
        if (!user)
            next(new NotFound("No such user"))
        else
            res.json(user)
    } catch (err) {
        next(new BadRequest("Invalid id"))
    }
})

router.post("/", async (req, res, next) => {
    const {username, email, age, info, address} = req.body
    try {
        res.json(await userService.create(username, email, age, info, address))
    } catch (err) {
        next(new BadRequest("Invalid parameters"))
    }
})

router.put("/:userId", async (req, res, next) => {
    const {username, email, age, info, address} = req.body
    try {
        const affected = await userService.update(req.params.userId, username, email, age, info, address)
        if (affected)
            res.json(affected)
        else
            next(new NotFound("No such user"))
    } catch (err) {
        next(err)
    }
})

router.delete("/:userId", async (req, res, next) => {
    try {
        const affected = await userService.delete(req.params.userId)
        if (affected)
            res.json(affected)
        else
            next(new NotFound("No such user"))
    } catch (err) {
        next(err)
    }
})

export const usersController = router
