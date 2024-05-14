import {Router} from "express";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {FeedbackService} from "../domain/feedback-service";


export const feedbacksRouter= Router({})

feedbacksRouter
    .post('/', authMiddleware,
        async (req, res) =>{
            const  newComment = await FeedbackService.sendFeedback(req.body.comment, req.user!._id)
        })
    .get('/', async (req, res)=>{
        const users = await FeedbackService
            .allFeedbacks()
        res.send(users)
    })
