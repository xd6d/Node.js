import {Router} from "express";
import {userService} from "./userService.js";

const router = Router()

//- зробіть ендпоінт "створення користувача" з обов'язковим параметром username і необов'язковим параметром name;
router.post("/", (req, res) => {
    const {username, name} = req.body
    res.json(userService.create(username, name))
})

// - зробіть ендпоінт "отримання даних користувача за його id" (id + username + name);
router.get("/:userId", (req, res) => {
    res.json(userService.getUser(req.params.userId))
})

// - зробіть ендпоінт "список користувачів" (список записів id + username + name);
router.get("/", (req, res) => {
    res.json(userService.getAllUsers())
})

// - зробіть ендпоінт "оновлення даних користувача за його id";
router.put("/:userId", (req, res) => {
    const {username, name} = req.body
    res.json(userService.update(req.params.userId, username, name))
})

// - зробіть ендпоінт "видалення користувача за його id";
router.delete("/:userId", (req, res) => {
    res.json(userService.delete(req.params.userId))
})

export const usersController = router
