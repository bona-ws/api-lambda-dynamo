const Iuuid = {
	type: "string",
	pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
};

const IAddItem = {
	type: "object",
	properties: {
		id: Iuuid,
		name: { type: "string" },
		restaurant_id: Iuuid,
		category: { type: "string" },
		current_stock: { type: "integer" },
		price: { type: "integer" },
		supplier: {
			type: "object",
			properties: {
				name: { type: "string" },
				descrpition: { type: "string" },
			},
		},
	},
	required: [
		"id",
		"restaurant_id",
		"name",
		"category",
		"current_stock",
		"price",
		"supplier",
	],
	additionalProperties: false,
};

export { IAddItem, Iuuid };
