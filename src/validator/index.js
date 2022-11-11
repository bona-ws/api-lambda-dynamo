import Ajv from "ajv";

const validator = new Ajv({ allErrors: true });

const validate = (schema, data) => {
	const compile = validator.compile(schema);
	const is_valid = compile(data);
	if (!is_valid) {
		throw compile.errors.map(
			({ instancePath, message }) => `${instancePath} ${message}`
		);
	}
};

export { validate };
