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
import { ListScreenProps } from "./interfaces";
import InputRow from "./InputRow";

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
