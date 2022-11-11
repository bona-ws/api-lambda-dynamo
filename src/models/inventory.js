import { IAddItem, Iuuid } from "../validator/schema.js";
import { validate } from "../validator/index.js";
import { DDBmapper } from "./mapper.js";
import * as service from "../services/inventory.js";
import { v4 as uuid } from "uuid";

export const addItem = async (payload) => {
	try {
		payload["id"] = uuid();
		validate(IAddItem, payload);
		const data = DDBmapper(payload);
		const result = await service.addItem(data);
		return result;
	} catch (e) {
		throw e;
	}
};

export const getItem = async ({ id, restaurant_id, last_evaluated_key }) => {
	try {
		validate(Iuuid, restaurant_id);
		const result = await service.getItem({
			id,
			restaurant_id,
			last_evaluated_key,
		});
		return result;
	} catch (e) {
		throw e;
	}
};
