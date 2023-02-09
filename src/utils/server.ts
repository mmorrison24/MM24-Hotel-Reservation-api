import express from "express";
import cors from "cors";
import {guestRouter} from "../guest/guest.router";

function createServer() {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/api/guests", guestRouter);

    return app;
}

export default createServer
