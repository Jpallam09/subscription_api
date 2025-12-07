import { response, Router } from "express";

const userRouter = Router();

userRouter.get('/', (request, response) => {
    response.send({ title: 'get all user' });
});

userRouter.get('/user/:id', (request, response) => {
    response.send({ title: 'get single user' })
});

userRouter.post('/users', (request, response) => {
    response.send({ title: 'make user' })
});

userRouter.put('/user/:id', (request, response) => {
    response.send({ title: 'Edit user' })
});

userRouter.delete('/user/:id', () => {
    response.send({ title: 'delete a user' })
});

export default userRouter;