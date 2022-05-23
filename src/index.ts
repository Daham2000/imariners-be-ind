import express from "express";
import cors from "cors";
import apiRouter from "./routes/api_router/api_router";
import * as dotenv from "dotenv";
import DBConnection from "./utill/database";

const app = express();

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
dotenv.config();
app.use(express.json({limit: '50mb'}));

app.use("/", apiRouter);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});

app.listen(PORT, () => {
    console.log(`iMariners server listening on port ${PORT}`);
});