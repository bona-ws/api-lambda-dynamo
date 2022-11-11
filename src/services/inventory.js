import { put, get } from "../connections/dynamodb.js";

export const addItem = async (data) => {
	try {
		return await put("inventory", data);
	} catch (err) {
		throw err;
	}
};

export const getItem = async ({ id, restaurant_id, last_evaluated_key }) => {
	try {
		const condition = {
			restaurant_id: {
				AttributeValueList: [
					{
						S: restaurant_id,
					},
				],
				ComparisonOperator: "EQ",
			},
		};
		return await get("inventory", last_evaluated_key, condition);
	} catch (err) {
		throw err;
	}
};
