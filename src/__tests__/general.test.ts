import supertest from "supertest";
import createServer from "../utils/server";

const app = createServer()
describe('general app', () => {
    it('respond 404 to a nonexistant /api route',async () => {
        await supertest(app).get('/api').expect(404)
    })
})

