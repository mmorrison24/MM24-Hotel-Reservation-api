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
