import * as model from "../models/inventory.js";

export const addItem = async (req, res) => {
	try {
		const payload = req.body;
		const response = await model.addItem(payload);
		res.json(response);
	} catch (e) {
		res.json(e);
	}
};

export const getItem = async (req, res) => {
	try {
		const { id, restaurant_id, last_evaluated_key } = req.query;
		const response = await model.getItem({
			id,
			restaurant_id,
			last_evaluated_key,
		});
		res.json(response);
	} catch (e) {
		res.json(e);
	}
};
