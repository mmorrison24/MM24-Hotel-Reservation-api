import express from "express";
import cors from "cors";
import {guestRouter} from "../guest/guest.router";
import {reservationRouter} from "../reservation/reservation.router";

function createServer() {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/api/guests", guestRouter);
    app.use("/api/reservations", reservationRouter);

    return app;
}

export default createServer
