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

	function removeListItem(removedItem: string) {
		setActiveList({
			title: activeList.title,
			items: activeList.items.filter((item) => item !== removedItem),
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
							onDelete={(removedItem: string) => removeListItem(removedItem)}
						/>
					)}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

interface ListScreenProps {
	list: List;
	onSubmit: Function;
	onDelete: Function;
}

function ListScreen({ list, onSubmit, onDelete }: ListScreenProps) {
	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<View
				style={{
					flex: 1,
					alignSelf: "stretch",
					flexDirection: "row",
					backgroundColor: "lightgray",
				}}
			>
				<FlatList
					style={{}}
					data={list.items}
					renderItem={({ item, index, separators }) => (
						<ListItem
							onPress={(text: string) => alert(text)}
							text={item}
							onDelete={onDelete}
						/>
					)}
					keyExtractor={(item) => item}
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

interface ListItemProps {
	text: string;
	onPress: Function;
	onDelete: Function;
}

function ListItem({ text, onPress, onDelete }: ListItemProps) {
	return (
		<View
			style={{
				flexDirection: "row",
				backgroundColor: "white",
				margin: 10,
				padding: 20,
			}}
		>
			<Pressable
				onPress={() => onPress(text)}
				onLongPress={() => console.log("longpress")}
				style={{ flexGrow: 1 }}
			>
				<Text>{text}</Text>
			</Pressable>
			<Pressable
				style={{ backgroundColor: "gray" }}
				onPress={() => onDelete(text)}
			>
				<Text style={{ color: "white" }}>Delete</Text>
			</Pressable>
		</View>
	);
}

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
					borderColor: "gray",
					borderWidth: StyleSheet.hairlineWidth,
					fontSize: 20,
					padding: 10,
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
				style={{ backgroundColor: "gray", padding: 20 }}
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
