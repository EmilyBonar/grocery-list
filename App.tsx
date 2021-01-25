import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

interface List {
	title: string;
	items: string[];
}

const DATA: List = {
	title: "sample list",
	items: ["apples", "bananas", "steak"],
};

let getAllKeys = async (): Promise<string[]> => {
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

let getMyStringValue = async (key: string): Promise<string> => {
	try {
		let value = await AsyncStorage.getItem(key);
		return value != null ? value : "";
	} catch (e) {
		// read error
		return "";
	}

	console.log("Done.");
};

let getMyObject = async (key: string): Promise<object> => {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		// read error
		return {};
	}

	console.log("Done.");
};
let setStringValue = async (key: string, value: string) => {
	try {
		await AsyncStorage.setItem(key, value);
	} catch (e) {
		// save error
	}

	console.log("Done.");
};

let setObjectValue = async (key: string, value: object) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
	} catch (e) {
		// save error
	}

	console.log("Done.");
};

let removeValue = async (key: string) => {
	try {
		await AsyncStorage.removeItem(key);
	} catch (e) {
		// remove error
	}

	console.log("Done.");
};

export default function App() {
	const [activeList, setActiveList] = useState<List>({} as List);
	useEffect(() => {
		async function startup() {
			//storage getAllKeys
			let keys: string[] = await getAllKeys();
			//if empty, create empty default list and active list
			if (keys.length === 0) {
				let emptyList = { title: "Default List", items: [] };
				setObjectValue(emptyList.title, emptyList);
				setStringValue("activeList", "Default List");
				setActiveList(emptyList);
			} else {
				//if not empty, setActiveList to active list
				setActiveList(
					(await getMyObject(await getMyStringValue("activeList"))) as List,
				);
			}
		}
		startup();
	}, []);

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name={activeList.title == undefined ? " " : activeList.title}
				>
					{(props) => (
						<ListScreen
							list={activeList}
							onSubmit={(text: string) => console.log(text)}
						/>
					)}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

interface ListItemProps {
	text: string;
	onPress: any;
}

function ListItem({ text, onPress }: ListItemProps) {
	return (
		<Pressable
			onPress={onPress}
			onLongPress={() => console.log("longpress")}
			style={{ padding: 20, flexDirection: "row" }}
		>
			<Text>{text}</Text>
		</Pressable>
	);
}
interface ListScreenProps {
	list: List;
	onSubmit: Function;
}
function ListScreen({ list, onSubmit }: ListScreenProps) {
	const [textEntered, setTextEntered] = useState<string>("");
	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
				<FlatList
					style={{}}
					data={list.items}
					renderItem={({ item, index, separators }) => (
						<ListItem onPress={() => alert(item)} text={item} />
					)}
				/>
			</View>
			<View style={{ flexDirection: "row", alignSelf: "stretch" }}>
				<TextInput
					style={{
						flex: 1,
						borderColor: "#888",
						borderWidth: StyleSheet.hairlineWidth,
						fontSize: 20,
					}}
					value={textEntered}
					onChangeText={(text) => setTextEntered(text)}
				/>
				<TouchableOpacity
					onPress={() => {
						onSubmit(textEntered);
						setTextEntered("");
					}}
					style={{ backgroundColor: "blue", padding: 20 }}
				>
					<Text style={{ fontSize: 20, color: "#fff" }}>Add to list</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
/*
Title Bar
  switch between lists
  settings
Flatlist
  list items w/gesture and pressable support
Enter new item
*/

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
