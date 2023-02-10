import express, {Request, Response} from "express";

import * as ReservationService from "./reservation.service"
import {body, check, validationResult} from "express-validator";

export const reservationRouter = express.Router()

// GET: All Reservations
reservationRouter.get("/", async (request, response) => {
    try {
        const reservations = await ReservationService.getReservations()
        return response.status(200).json(reservations)
    } catch (error){
        return response.status(500).json(error.message)
    }
})

// POST: Reservation by ID
reservationRouter.get('/:id', async (request, response) => {
    const id = request.params.id;
    try {
        const reservation = await ReservationService.getReservation(id)
        return response.status(200).json(reservation)
    } catch (error){
        return response.status(500).json(error.message)
    }
})

// POST: Create a Reservation
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

        try {
            const reservation = req.body;
            const reservationNew = await ReservationService.createReservation(reservation);
            return resp.status(201).json(reservationNew);
        } catch (error: any) {
            return resp.status(500).json(error.message);
        }
    }
);

// PATCH: Cancelling a reservation
reservationRouter.patch('/cancel', [
    check('id').isMongoId().withMessage("id Is invalid"),
    async (req, resp) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resp.status(400).json({ errors: errors.array() });
        }

        try {
            const reservationId = req.query.id;
            const reservationCanceled = await ReservationService.cancelReservation(reservationId);

            if(!reservationCanceled)
                return resp.status(404).json({ msg: 'Reservation not found' });
            return resp.status(200).json({ msg: 'Reservation cancelled successfully', reservation: reservationCanceled });

        } catch (error: any) {
            return resp.status(500).json(error.message);
        }

    }
]);
