import {prismaClient} from "../utils/db.singleton";
import {Reservation} from "@prisma/client";

export async function getReservations(): Promise<Array<Reservation>> {
    const reservations = await prismaClient.reservation.findMany();
    return reservations

};

export function getReservation(id: string): Promise<Reservation | null> {
    return prismaClient.reservation.findFirst({
        where: {
            id,
        },
    });

};

