import {prismaClient} from "../src/utils/db.singleton";

const guests = [
    {
        name: "John Doe",
    },
    {
        name: "Sean Snow",
    }]

const reservations = [
    {
        hotel: 'Transylvania',
        isActive: true,
        arrival: new Date("1922-02-02"),
        departure: new Date("1922-02-03"),
        stayAmount: 100,

    },
];

(async () => {
    await prismaClient.reservation.deleteMany({})
    await prismaClient.guest.deleteMany({})

    await Promise.all(
        guests.map((guest) => {
            return prismaClient.guest.create({
                data: {
                    name: guest.name
                },
            });
        })
    );
    const guest = await prismaClient.guest.findFirst({
        where: {
            name: "John Doe",
        },
    });

    await Promise.all(
        reservations.map((resv) => {
                const {hotel, isActive, arrival, departure, stayAmount} = resv;
                return prismaClient.reservation.create({
                    data: {
                        hotel,
                        isActive,
                        stayAmount,
                        arrival, departure,
                        guest: {
                            connect: {
                                id: guest.id
                            },
                        },
                    }
                })
            }
        )
    )
})();
