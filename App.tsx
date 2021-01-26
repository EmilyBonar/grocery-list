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
import {
	getAllKeys,
	setObjectValue,
	setStringValue,
	getMyObject,
	getMyStringValue,
	removeValue,
} from "./components/storage";

const Stack = createStackNavigator();

interface List {
	title: string;
	items: string[];
}

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

	useEffect(() => {
		setObjectValue(activeList.title, activeList);
	}, [activeList]);

	function pushListItem(newItem: string) {
		setActiveList({
			title: activeList.title,
			items: [...activeList.items, newItem],
		});
	}

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name={activeList.title == undefined ? " " : activeList.title}
				>
					{(props) => (
						<ListScreen
							list={activeList}
							onSubmit={(text: string) => pushListItem(text)}
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
			<InputRow onSubmit={onSubmit} />
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

interface InputRowProps {
	onSubmit: Function;
}

function InputRow({ onSubmit }: InputRowProps) {
	const [textEntered, setTextEntered] = useState<string>("");
	return (
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
				autoCapitalize="words"
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
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
