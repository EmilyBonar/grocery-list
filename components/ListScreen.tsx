import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { AddButton } from "./Buttons";
import { ListScreenProps, InputRowProps } from "./interfaces";

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

function InputRow({ onSubmit }: InputRowProps) {
	const [textEntered, setTextEntered] = useState<string>("");
	return (
		<View
			style={{
				flexDirection: "row",
				alignSelf: "stretch",
				borderColor: "gray",
				borderTopWidth: StyleSheet.hairlineWidth,
				backgroundColor: "white",
			}}
		>
			<TextInput
				style={{
					flex: 1,
					fontSize: 20,
					padding: 10,
				}}
				value={textEntered}
				onChangeText={(text) => setTextEntered(text)}
				autoCapitalize="words"
			/>
			<AddButton
				onPress={() => {
					onSubmit(textEntered);
					setTextEntered("");
				}}
			/>
		</View>
	);
}
