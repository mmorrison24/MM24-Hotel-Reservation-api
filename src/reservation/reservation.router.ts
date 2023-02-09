import express from "express";

import * as ReservationService from "./reservation.service"

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
