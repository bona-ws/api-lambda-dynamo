export const DDBmapper = (payload) => {
	const data = {};
	Object.keys(payload).forEach((key) => {
		let _data = payload[key];
		let type = typeof _data;

		if (type === "object") {
			_data = JSON.stringify(_data);
		}
		type === "number" ? (type = "N") : (type = "S");

		data[key] = { [type]: `${_data}` };
	});
	return data;
};

export const DDBToJson = (lists) => {
	lists.map((list) => {});
};
