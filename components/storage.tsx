import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAllKeys = async (): Promise<string[]> => {
	let keys: string[] = [];
	try {
		keys = await AsyncStorage.getAllKeys();
	} catch (e) {
		// read key error
	}

	return keys;
	// example console.log result:
	// ['@MyApp_user', '@MyApp_key']
};

export const getMyStringValue = async (key: string): Promise<string> => {
	try {
		let value = await AsyncStorage.getItem(key);
		return value != null ? value : "";
	} catch (e) {
		// read error
		return "";
	}

	console.log("Done.");
};

export const getMyObject = async (key: string): Promise<object> => {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		// read error
		return {};
	}

	console.log("Done.");
};
export const setStringValue = async (key: string, value: string) => {
	try {
		await AsyncStorage.setItem(key, value);
	} catch (e) {
		// save error
	}

	console.log("Done.");
};

export const setObjectValue = async (key: string, value: object) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
	} catch (e) {
		// save error
	}

	console.log("Done.");
};

export const removeValue = async (key: string) => {
	try {
		await AsyncStorage.removeItem(key);
	} catch (e) {
		// remove error
	}

	console.log("Done.");
};

export const clearAll = async () => {
	try {
		await AsyncStorage.clear();
	} catch (e) {
		// clear error
	}

	console.log("Done.");
};
