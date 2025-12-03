import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (request, response)=>{
    response.send({title: 'Get all subscription'})
});

subscriptionRouter.get('/:id', (request, response)=>{
    response.send({title: 'Get one Subscription'})
});

subscriptionRouter.put('/:id', (request, response)=>{
    response.send({title: 'Edit subscription'})
});

subscriptionRouter.delete('/:id', (request, response)=>{
    response.send({title: 'Delete a subscription'})
});

subscriptionRouter.get('/user:id', (request, response)=>{
    response.send({title: 'Cancel all subscription'})
});

subscriptionRouter.get('/:id/cancel', (request, response)=>{
    response.send({title: 'Cancel subscription'})
});

subscriptionRouter.get('/upcoming-renewals', (request, response)=>{
    response.send({title: 'Get all upcoming renewals'})
});

export default subscriptionRouter;