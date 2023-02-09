import {prismaClient} from "../utils/db.singleton";
import {Guest, Reservation} from "@prisma/client";

interface ReservationInput {
    hotel?: string;
    arrival?: Date;
    departure?: Date;
    stayAmount?: number;
    isActive?: boolean;
    guestId?: string;
}

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

export const createReservation = async (
    reservation: ReservationInput
): Promise<ReservationInput> => {
    const {hotel, arrival, departure, stayAmount, guestId} = reservation;

    // @ts-ignore
    return prismaClient.reservation.create({
        data: {
            hotel,
            arrival,
            departure,
            stayAmount,
            isActive: true,
            guest: {
                connect: {
                    id: guestId
                }
            }
        }
    });
};
