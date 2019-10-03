import { transform, isEqual, isObject } from "lodash/fp";

const _transform = transform.convert({
	cap: false
});

const iteratee = baseObj => (result, value, key) => {
	if (!isEqual(value, baseObj[key])) {
		const valIsObj = isObject(value) && isObject(baseObj[key]);
		result[key] = valIsObj === true ? diff(value, baseObj[key]) : value;
	}
};

/**
 * 
 * @param {*} targetObj 
 * @param {*} baseObj 
 * @source https://gist.github.com/Yimiprod/7ee176597fef230d1451#gistcomment-2324809
 */
const diff = (targetObj, baseObj) => {
	return _transform(iteratee(baseObj), null, targetObj);
}

export default diff;