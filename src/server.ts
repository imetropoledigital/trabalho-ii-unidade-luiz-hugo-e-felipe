import express from "express";

import "@/infra/databases/mongodb/MongoConnection";
import { MongoConnection } from "@/infra/databases/mongodb/MongoConnection";
import dotenv from 'dotenv';
import { router } from "./routes";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(router);

app.get('/', (req,res)=>{
    res.send("Hello, world!");
}); 

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    MongoConnection.getInstance();
});
