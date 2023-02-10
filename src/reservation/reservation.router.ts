import express, {Request, Response} from "express";

import * as ReservationService from "./reservation.service"
import {body, validationResult} from "express-validator";
import * as GuestService from "../guest/guest.service";

export const reservationRouter = express.Router()

reservationRouter.get("/", async (request, response) => {
    try {
        const reservations = await ReservationService.getReservations()
        return response.status(200).json(reservations)
    } catch (error){
        return response.status(500).json(error.message)
    }
})

reservationRouter.get('/:id', async (request, response) => {
    console.log('test')
    const id = request.params.id;
    try {
        const reservation = await ReservationService.getReservation(id)
        return response.status(200).json(reservation)
    } catch (error){
        return response.status(500).json(error.message)
    }
})

// POST: Create a Reservation
// Params: name
reservationRouter.post(
    "/",
    [
        body("hotel").isString().withMessage("Hotel name is required"),
        body("arrival").not().isEmpty().withMessage("Arrival date is required"),
        body("departure").not().isEmpty().withMessage("Departure date is required"),
        body("stayAmount").not().isEmpty().withMessage("Stay amount is required"),
        body('guestId').optional(),
        body('guestName').optional(),
    ],
    async (req: Request, resp: Response) => {
        const errors = validationResult(req);
        const haveGuest = !!req.body.guestId || !!req.body.guestName;

        if (!errors.isEmpty() || !haveGuest) {
            if(!haveGuest){
                return resp.status(400).json({ errors: [{ msg: 'Please provide either guestid or guestname' }] });
            }
            return resp.status(400).json({ errors: errors.array() });
        }
        // check if guestid or guestname is present
        if (req.body.guestid) {
            // handle creating reservation using guestid
        } else if (req.body.guestname) {
            // handle creating reservation using guestname
        }
        try {
            const reservation = req.body;
            const reservationNew = await ReservationService.createReservation(reservation);
            return resp.status(201).json(reservationNew);
        } catch (error: any) {
            return resp.status(500).json(error.message);
        }
    }
);

