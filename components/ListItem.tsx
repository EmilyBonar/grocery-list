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
import Svg, { Path } from "react-native-svg";

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
				style={{ width: 24, height: 24 }}
				onPress={() => onDelete(text)}
			>
				<Svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<Path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</Svg>
			</Pressable>
		</View>
	);
}
