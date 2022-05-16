import { Request, Response, Router } from "express";
import generalRouter from "./general_router";

const apiRouter = Router();

apiRouter.get('/',(req,res)=>{
    res.send('We are on post page...');
});

apiRouter.use("/", generalRouter);

export default apiRouter;