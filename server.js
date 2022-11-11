import express from "express";
import cors from "cors";
import dotEnv from "./config.js";

import router from "./src/router/index.js";
import { migrate } from "./src/connections/dynamodb.js";

dotEnv();
const port = process.env.PORT;
const app = express();

app.listen(port);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router);

migrate();

console.log(`server run on ${process.env.NODE_ENV} mode on port ${port}`);

process.on("uncaughtException", (e) => {
	console.log(e.message);
	process.exit(1);
});

export { app };
