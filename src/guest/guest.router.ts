import express from "express";
import type {Request, Response} from "express";
import {body, validationResult} from "express-validator";

import * as GuestService from "./guest.service"

export const guestRouter = express.Router()

// GET: All Guest
guestRouter.get("/", async (req, resp) => {
    try {
        const guests = await GuestService.getGuests()
        return resp.status(200).json(guests)
    } catch (error){
        return resp.status(500).json(error.message)
    }
})

// GET: Guest by id
guestRouter.get("/:guestId", async (req, resp) => {
    try {
        const guest = await GuestService.getGuest(req.params.guestId)
        if(!guest)
            return resp.status(404).json({ msg: 'Guest not found' });

        const staySummary = await GuestService.staySummary(guest)
        return resp.status(200).json(staySummary)
    } catch (error){
        return resp.status(500).json(error.message)
    }
})


// POST: Create a Guest
guestRouter.post(
    "/",
    body("name").isString(),
    async (req: Request, resp: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resp.status(400).json({ errors: errors.array() });
        }
        try {
            const guest = req.body;
            const guestNew = await GuestService.createGuest(guest);
            return resp.status(201).json(guestNew);
        } catch (error: any) {
            return resp.status(500).json(error.message);
        }
    }
);
