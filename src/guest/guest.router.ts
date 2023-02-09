import express from "express";
import type {Request, Response} from "express";
import {body, validationResult} from "express-validator";

import * as GuestService from "./guest.service"

export const guestRouter = express.Router()

guestRouter.get("/", async (request, response) => {
    try {
        const guests = await GuestService.getGuest()
        return response.status(200).json(guests)
    } catch (error){
        return response.status(500).json(error.message)
    }
})

// POST: Create a Guest
// Params: name
guestRouter.post(
    "/",
    body("name").isString(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        try {
            const guest = request.body;
            const guestNew = await GuestService.createGuest(guest);
            return response.status(201).json(guestNew);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);
