import { Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { DeleteButton } from "./Buttons";

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
			<DeleteButton onPress={() => onDelete(text)} text={text} />
		</View>
	);
}
