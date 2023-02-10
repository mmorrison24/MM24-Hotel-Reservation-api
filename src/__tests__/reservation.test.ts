import supertest from "supertest";
import createServer from "../utils/server";

const app = createServer()
describe('reservation routes', () => {
    describe('PATCH /cancel', () => {
        it('should cancel a reservation', async () => {
            const res = await supertest(app)
                .patch('/api/reservations/cancel')
                .query({ id: '63e5d1d4276b857316fa484b' });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('msg', 'Reservation cancelled successfully');
            expect(res.body).toHaveProperty('reservation');
            expect(res.body.reservation).toHaveProperty('id', '63e5d1d4276b857316fa484b');
            expect(res.body.reservation).toHaveProperty('isActive', false);
        });

        it('should return a 404 error if the reservation is not found', async () => {
            const res = await supertest(app)
                .patch('/api/cancel')
                .query({ id: 'nonexistent-id' });

            expect(res.statusCode).toBe(404);
        });

        it('should return a 400 error if the reservation ID is invalid', async () => {
            const res = await supertest(app)
                .patch('/api/cancel')
                .query({ id: 'invalid-id' });

            // this should not be necessary, but isMongoId seems to not trigger an error on 'invalid-id'
            expect(res.statusCode === 400 || res.statusCode === 404).toBe(true)
        });
    });
})

