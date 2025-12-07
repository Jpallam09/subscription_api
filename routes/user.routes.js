import { response, Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUser);

userRouter.post('/', (request, response) => {
    response.send({ title: 'make user' })
});

userRouter.put('/:id', (request, response) => {
    response.send({ title: 'Edit user' })
});

userRouter.delete('/:id', () => {
    response.send({ title: 'delete a user' })
});

export default userRouter;