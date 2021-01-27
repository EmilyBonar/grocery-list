import { Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { DeleteButton } from "./Buttons";
import { ListItemProps } from "./interfaces";

export default function ListItem({
	text,
	details,
	onPress,
	onLongPress,
	onDelete,
}: ListItemProps) {
	if (details) {
		console.log(details);
	}
	return (
		<View
			style={{
				flexDirection: "row",
				backgroundColor: "white",
				margin: 10,
				padding: 10,
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
				<Text
					style={{
						textTransform: "capitalize",
						fontSize: 18,
						fontWeight: "bold",
						color: "dimgray",
					}}
				>
					{text}
				</Text>
			</Pressable>
			<DeleteButton onPress={() => onDelete(text)} />
		</View>
	);
}
