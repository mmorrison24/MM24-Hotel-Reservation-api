import * as dotenv from "dotenv";
import createServer from "./utils/server";


dotenv.config();
console.log('test')
if (!process.env.PORT) {
    console.log('set PORT setting in .env file')
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = createServer()

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
