import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";

interface List {
	id: string;
	title: string;
	items: string[];
}

interface ListScreenProps {
	list: List;
	onSubmit: Function;
	onDelete: Function;
}

export default function ListScreen({
	list,
	onSubmit,
	onDelete,
}: ListScreenProps) {
	return (
		<View style={{ flexGrow: 1 }}>
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
					keyExtractor={(item, index) => item + index.toString()}
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
