import { createRequire } from "module";
import dotEnv from "../../config.js";
const require = createRequire(import.meta.url);
const AWS = require("aws-sdk");

dotEnv();

export const DDB = new AWS.DynamoDB({
	apiVersion: "latest",
	endpoint: process.env.DB_ENDPOINT,
	region: process.env.DB_REGION,
	credentials: {
		accessKeyId: process.env.DB_ACCESS_KEY,
		secretAccessKey: process.env.DB_SECRET_KEY,
	},
});

export const migrate = () =>
	DDB.describeTable({ TableName: "inventory" }, (err) => {
		if (err) {
			if (err.message.includes("resource not found")) {
				DDB.createTable(
					{
						TableName: "inventory",
						AttributeDefinitions: [
							{
								AttributeName: "name",
								AttributeType: "S",
							},
							{
								AttributeName: "restaurant_id",
								AttributeType: "S",
							},
						],
						ProvisionedThroughput: {
							ReadCapacityUnits: 1,
							WriteCapacityUnits: 1,
						},
						KeySchema: [
							{
								AttributeName: "restaurant_id", //Partition Key
								KeyType: "HASH",
							},
							{
								AttributeName: "name", //Sort Key
								KeyType: "RANGE",
							},
						],
					},
					(err) => {
						if (err) {
							console.log(err.message);
						}
						console.log("Table Inventory Created");
					}
				);
				return;
			}
			console.log(err.message);
		}
	});

export const put = (table_name, data) => {
	return new Promise((resolve, reject) =>
		DDB.putItem({ TableName: table_name, Item: data }, (err) => {
			if (err) {
				reject(err.message);
				console.log(err.message);
			}
			resolve(`Success add items into ${table_name}`);
		})
	);
};

export const get = (table_name, last_evaluated_key, condition) => {
	return new Promise((resolve, reject) =>
		DDB.query(
			Object.assign(
				{
					TableName: table_name,
					KeyConditions: condition,
					Limit: 3,
				},
				last_evaluated_key
					? { ExclusiveStartKey: JSON.parse(last_evaluated_key) }
					: {}
			),
			(err, data) => {
				if (err) {
					console.log(err.message);
					reject(err.message);
				}
				resolve({ data: data.Items, LastEvaluatedKey: data.LastEvaluatedKey });
			}
		)
	);
};
