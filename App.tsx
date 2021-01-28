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
				setStringValue("activeList", "Default List");
				setActiveList(emptyList);
				setAllLists([emptyList]);
			} else {
				//if not empty, setActiveList to active list
				setActiveList(
					(await getMyObject(await getMyStringValue("activeList"))) as List,
				);
				let lists = await Promise.all(
					keys
						.filter((key) => key !== "activeList" && key !== "undefined")
						.map((key) => getMyObject(key)),
				);
				setAllLists(lists as List[]);
			}
		}
		startup();
	}, []);

	useEffect(() => {
		setObjectValue(activeList.id, activeList);
	}, [activeList]);
	useEffect(() => {
		async function syncLists() {
			//treats local lists as source of truth
			//storage getAllKeys
			let storedKeys: string[] = (await getAllKeys()).filter(
				(key) => key !== "activeList" && key !== "undefined",
			);
			let localKeys: string[] = allLists.map((list) => list.id);
			console.log({ storedKeys, localKeys });
			//get new lists
			let newKeys: string[] = localKeys.filter(
				(key) => !storedKeys.includes(key),
			);
			//get deleted lists
			let deletedKeys: string[] = storedKeys.filter(
				(key) => !localKeys.includes(key),
			);
			//make them match
			newKeys.forEach((key) => {
				let newList = findList(key);
				if (newList) {
					setObjectValue(key, newList);
				}
			});
			deletedKeys.forEach((key) => {
				removeValue(key);
			});
		}
		if (allLists.length != 0) {
			syncLists();
		}
	}, [allLists]);

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
		setAllLists([...allLists, { id: newKey, items: [] }]);
	}

	async function removeList(removedKey: string) {
		setAllLists(allLists.filter((list) => list.id !== removedKey));
		if (activeList.id === removedKey) {
			setActiveList(allLists[0]);
		}
	}

	function findList(searchKey: string): List | undefined {
		return allLists.find((list) => list.id == searchKey);
	}

	function switchLists(newKey: string) {
		let newActiveList = findList(newKey);
		if (newActiveList) {
			setActiveList(newActiveList);
			setStringValue("activeList", newActiveList.id);
		}
	}

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName={activeList == null ? " " : activeList.id}
			>
				<Stack.Screen
					name="Active List"
					options={({ navigation, route }) => ({
						headerRight: () => (
							<SettingsButton
								onPress={() => navigation.navigate("List Options")}
							/>
						),
						title: activeList == null ? " " : activeList.id,
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
							onSwitch={(text: string) => {
								switchLists(text);
								props.navigation.goBack();
							}}
							onSubmit={(text: string) => pushList(text)}
							onDelete={(removedList: string) => removeList(removedList)}
						/>
					)}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
