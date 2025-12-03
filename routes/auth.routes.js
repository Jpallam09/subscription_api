import {Router} from 'express'

const authRouter = Router();

authRouter.post('/sign-up', (request, response)=>{
    response.send({title: 'User sign-up'})
});

authRouter.post('/sign-in', (request, response)=>{
    response.send({title: 'User sign-in'})
});

authRouter.post('/sign-out', (request, response)=>{
    response.send({title: 'User sign-out'})
});

export default authRouter;