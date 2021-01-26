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
	id?: string;
	title: string;
	items: string[];
}

interface ListOptionsScreenProps {
	lists: List[];
	onSubmit: Function;
	onDelete: Function;
}

export default function ListOptionsScreen({
	lists,
	onSubmit,
	onDelete,
}: ListOptionsScreenProps) {
	return (
		<View style={{ flexGrow: 1 }}>
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
					data={lists}
					renderItem={({ item, index, separators }) => (
						<ListItem
							onPress={(text: string) => alert(text)}
							text={item.title}
							onDelete={onDelete}
						/>
					)}
					keyExtractor={(item, index) => item + index.toString()}
				/>
			</View>
		</View>
	);
}

interface ListItemProps {
	text: string;
	onPress: Function;
	onLongPress?: Function;
	onDelete: Function;
}

function ListItem({ text, onPress, onLongPress, onDelete }: ListItemProps) {
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
				onLongPress={() => {
					if (onLongPress != undefined) {
						onLongPress(text);
					}
				}}
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
