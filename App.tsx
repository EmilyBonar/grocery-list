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
import Svg, { Path } from "react-native-svg";

const Stack = createStackNavigator();

interface List {
	id: string;
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
							<Pressable
								style={{ width: 24, height: 24, margin: 20 }}
								onPress={() => navigation.navigate("List Options")}
							>
								<Svg fill="none" viewBox="0 0 24 24" stroke="gray">
									<Path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
									/>
									<Path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</Svg>
							</Pressable>
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
