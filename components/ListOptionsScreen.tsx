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
import ListItem from "./ListItem";
import { ListOptionsScreenProps } from "./interfaces";
import InputRow from "./InputRow";

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
			<InputRow onSubmit={onSubmit} />
		</View>
	);
}
