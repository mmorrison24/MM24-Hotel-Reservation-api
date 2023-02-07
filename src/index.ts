import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";


dotenv.config();
console.log('test')
if (!process.env.PORT) {
    console.log('set PORT setting in .env file')
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
