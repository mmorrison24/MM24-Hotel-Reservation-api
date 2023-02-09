import {prismaClient} from "../utils/db.singleton";
import {Guest} from "@prisma/client";

export async function getGuest(): Promise<Array<Guest>> {
    const guests = await prismaClient.guest.findMany();
    return guests

};


