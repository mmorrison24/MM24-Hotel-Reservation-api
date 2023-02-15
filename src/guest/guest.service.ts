import {prismaClient} from "../utils/db.singleton";
import {Guest, Reservation} from "@prisma/client";
import any = jasmine.any;

export async function getGuests(): Promise<Array<Guest>> {
    const guests = await prismaClient.guest.findMany();
    return guests

};

export async function getGuest(guestId: string): Promise<Guest> {
    const guests = await prismaClient.guest.findFirst({
        where: {id: guestId}
    });
    return guests
};

function calculateStayStatistics(stays: Array<Reservation>) {
    const upcomingStays = stays.filter(stay => stay.isActive && stay.arrival > new Date());
    const pastStays = stays.filter(stay => !stay.isActive || stay.departure < new Date());
    const cancelledStays = stays.filter(stay => !stay.isActive && stay.arrival > new Date());

    const totalUpcomingStayAmount = upcomingStays.reduce((sum, stay) => sum + stay.stayAmount, 0);
    const totalPastStayAmount = pastStays.reduce((sum, stay) => sum + stay.stayAmount, 0);
    const totalCancelledStayAmount = cancelledStays.reduce((sum, stay) => sum + stay.stayAmount, 0);

    // @ts-ignore
    const totalNightsInPastStays = pastStays.reduce((sum, stay) => sum + (stay.departure - stay.arrival) / (1000 * 60 * 60 * 24), 0)
    // @ts-ignore
    const totalNightsInUpcomingStays = upcomingStays.reduce((sum, stay) => sum + (stay.departure - stay.arrival) / (1000 * 60 * 60 * 24), 0)


    return {
        upcomingStays,
        pastStays,
        cancelledStays,
        totalUpcomingStayAmount,
        totalPastStayAmount,
        totalCancelledStayAmount,
        totalNightsInPastStays,
        totalNightsInUpcomingStays
    };
}

export async function staySummary(guest: Guest): Promise<any> {

    const {id, name} = guest;

    const stays = await prismaClient.reservation.findMany({
        where: {guestId: id},
    });

    const {
        upcomingStays,
        pastStays,
        cancelledStays,
        totalUpcomingStayAmount,
        totalPastStayAmount,
        totalCancelledStayAmount,
        totalNightsInPastStays,
        totalNightsInUpcomingStays
    } = calculateStayStatistics(stays);

    return {
        guest: {id, name},
        upcomingStayInfo: {
            numberOfUpcomingStays: upcomingStays.length,
            totalNightsInUpcomingStays,
            totalUpcomingStayAmount,
        },
        pastStayInfo: {
            numberOfPastStays: pastStays.length,
            // @ts-ignore
            totalNightsInPastStays,
            totalPastStayAmount,
        },
        cancelledStayInfo: {
            numberOfCancelledStays: cancelledStays.length,
            totalCancelledStayAmount,
        }
    };
}

export const createGuest = async (
    guest: Omit<Guest, "id" | "createdAt">
): Promise<Omit<Guest, "id" | "createdAt" | "updatedAt">> => {
    const {name} = guest;

    return prismaClient.guest.create({
        data: {
            name,
        },
        select: {
            name: true,
        },
    });
};

