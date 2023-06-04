export const mapValueToLabel = (options, value) => {
	let ret = "";
	const one = options.find((item) => item.value === value);
	if (one) {
		ret = one.label;
	}
	return ret;
};

export const mapLabelToValue = (options, label) => {
	let ret = "";
	const one = options.find((item) => item.label === label);
	if (one) {
		ret = one.value;
	}
	return ret;
};
