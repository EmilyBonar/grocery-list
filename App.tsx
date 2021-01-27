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
	clearAll,
} from "./components/storage";
import ListScreen from "./components/ListScreen";
import ListOptionsScreen from "./components/ListOptionsScreen";
import { SettingsButton } from "./components/Buttons";
import { List } from "./components/interfaces";

const Stack = createStackNavigator();

export default function App() {
	const [activeList, setActiveList] = useState<List>({} as List);
	const [allLists, setAllLists] = useState<List[]>([]);
	useEffect(() => {
		async function startup() {
			//storage getAllKeys
			let keys: string[] = await getAllKeys();
			//if empty, create empty default list and active list
			if (keys.length === 0) {
				let emptyList: List = {
					id: "Default List",
					items: [],
				};
				setObjectValue(emptyList.id, emptyList);
				setStringValue("activeList", "Default List");
				setActiveList(emptyList);
				setAllLists([emptyList]);
			} else {
				//if not empty, setActiveList to active list
				setActiveList(
					(await getMyObject(await getMyStringValue("activeList"))) as List,
				);
				updateLists();
			}
		}
		startup();
	}, []);

	function pushListItem(newItem: string) {
		setActiveList({
			id: activeList.id,
			items: [...activeList.items, newItem],
		});
	}

	function removeListItem(removedItem: string) {
		setActiveList({
			id: activeList.id,
			items: activeList.items.filter((item) => item !== removedItem),
		});
	}

	function pushList(newKey: string) {
		if (!allLists.map((list) => list.id).includes(newKey)) {
			setObjectValue(newKey, { id: newKey, title: newKey, items: [] });
		}
		updateLists();
	}

	function removeList(removedKey: string) {
		removeValue(removedKey);
		updateLists();
	}

	async function updateLists() {
		let keys: string[] = await getAllKeys();
		Promise.all(
			keys
				.filter((key) => key !== "activeList" && key !== "undefined")
				.map((key) => getMyObject(key)),
		).then((lists) => setAllLists(lists as List[]));
	}

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName={activeList.id == undefined ? " " : activeList.id}
			>
				<Stack.Screen
					name={activeList.id == undefined ? " " : activeList.id}
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
							lists={allLists}
							onSubmit={(text: string) => pushList(text)}
							onDelete={(removedList: string) => removeList(removedList)}
						/>
					)}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
