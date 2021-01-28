import { Pressable, Text, View, FlatList } from "react-native";
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
	let detailsText: string[] = [];
	if (details) {
		detailsText = details.map((item) => {
			for (let key in item) {
				return `${key}: ${item[key]}`;
			}
		});
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
				<FlatList
					style={{}}
					data={detailsText}
					renderItem={({ item, index, separators }) => (
						<Text style={{ textTransform: "capitalize", color: "gray" }}>
							{item}
						</Text>
					)}
					keyExtractor={(item, index) => item + index.toString()}
				/>
			</Pressable>
			<DeleteButton onPress={() => onDelete(text)} />
		</View>
	);
}
