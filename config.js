import dotenv from "dotenv";

let configPath = "";
if (process.env.NODE_ENV === "development") configPath = "./development.env";
if (process.env.NODE_ENV === "staging") configPath = "./staging.env";
if (process.env.NODE_ENV === "production") configPath = "./production.env";

const dotenvInit = () => {
	dotenv.config({
		path: configPath,
	});
};
export default dotenvInit;
