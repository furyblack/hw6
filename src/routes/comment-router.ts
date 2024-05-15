import {Router} from "express";
import {authMiddleware} from "../middlewares/auth/auth-middleware";


export const commentRouter= Router({})

commentRouter.post('/', authMiddleware, async (req, res) =>{


        })
commentRouter.get('/', async (req, res)=>{


})
