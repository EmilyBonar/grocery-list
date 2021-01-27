import React, { useEffect, useState } from "react";
import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Button,
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
import ListScreen from "./components/ListScreen";
import ListOptionsScreen from "./components/ListOptionsScreen";
import { SettingsButton } from "./components/Buttons";

const Stack = createStackNavigator();

interface List {
	id: string;
	title: string;
	items: string[];
}

export default function App() {
	const [activeList, setActiveList] = useState<List>({} as List);
	const [allLists, setAllLists] = useState<List[]>([]);
	useEffect(() => {
		async function startup() {
			//storage getAllKeys
			let keys: string[] = await getAllKeys();
			//if empty, create empty default list and active list
			if (keys.length === 0) {
				let emptyList = {
					id: "Default List",
					title: "Default List",
					items: [],
				};
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

	useEffect(() => {
		async function getLists() {
			let keys: string[] = await getAllKeys();
			Promise.all(
				keys
					.filter((key) => key !== "activeList" && key !== "undefined")
					.map((key) => getMyObject(key)),
			).then((lists) => console.log(lists));
		}
		getLists();
	});

	function pushListItem(newItem: string) {
		setActiveList({
			id: activeList.title,
			title: activeList.title,
			items: [...activeList.items, newItem],
		});
	}

	function removeListItem(removedItem: string) {
		setActiveList({
			id: activeList.title,
			title: activeList.title,
			items: activeList.items.filter((item) => item !== removedItem),
		});
	}

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName={
					activeList.title == undefined ? " " : activeList.title
				}
			>
				<Stack.Screen
					name={activeList.title == undefined ? " " : activeList.title}
					options={({ navigation, route }) => ({
						headerRight: () => (
							<SettingsButton
								onPress={() => navigation.navigate("List Options")}
							/>
						),
					})}
				>
					{(props) => (
						<ListScreen
							list={activeList}
							onSubmit={(text: string) => pushListItem(text)}
							onDelete={(removedItem: string) => removeListItem(removedItem)}
						/>
					)}
				</Stack.Screen>
				<Stack.Screen name="List Options">
					{(props) => (
						<ListOptionsScreen
							lists={[activeList]}
							onSubmit={(text: string) => pushListItem(text)}
							onDelete={(removedItem: string) => removeListItem(removedItem)}
						/>
					)}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
