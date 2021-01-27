import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";

interface ListItemProps {
	text: string;
	onPress: Function;
	onLongPress?: Function;
	onDelete: Function;
}

export default function ListItem({
	text,
	onPress,
	onLongPress,
	onDelete,
}: ListItemProps) {
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
