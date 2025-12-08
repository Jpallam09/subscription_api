import { response, Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get('/', getUsers);

//added authorize middleware to protect this route
userRouter.get('/:id', authorize, getUser);

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