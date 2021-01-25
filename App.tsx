import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
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

async function startup(setActiveList: Function) {
	//storage getAllKeys
	let keys = await AsyncStorage.getAllKeys();
	//if empty, create empty default list and active list
	if (keys.length === 0) {
	} else {
		//if not empty, setActiveList to active list
	}
}

export default function App() {
	const [activeList, setActiveList] = useState<List>({} as List);

	useEffect(() => {
		async function startup() {
			//storage getAllKeys
			let keys = await AsyncStorage.getAllKeys();
			//if empty, create empty default list and active list
			if (keys.length === 0) {
				let emptyList = { title: "Default List", items: [] };
				setActiveList(emptyList);
			} else {
				//if not empty, setActiveList to active list
			}
		}
		startup();
	});

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name={activeList.title == undefined ? " " : activeList.title}
				>
					{(props) => <ListScreen list={activeList} />}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

interface ListItemProps {
	text: string;
	onPress: Function;
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

function ListScreen(list: List) {
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
				/>
				<TouchableOpacity
					onPress={() => alert("Hello, World!")}
					style={{ backgroundColor: "skyblue", padding: 20 }}
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
