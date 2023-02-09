import {prismaClient} from "../utils/db.singleton";
import {Guest} from "@prisma/client";

export async function getGuest(): Promise<Array<Guest>> {
    const guests = await prismaClient.guest.findMany();
    return guests

};

export const createGuest = async (
    guest: Omit<Guest, "id"|"createdAt">
): Promise<Omit<Guest, "id"|"createdAt"|"updatedAt">> => {
    const { name } = guest;

    return prismaClient.guest.create({
        data: {
            name,
        },
        select: {
            name: true,
        },
    });
};
