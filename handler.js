import { app } from "./server.js";
import serverless from "serverless-http";

export const server = serverless(app);
