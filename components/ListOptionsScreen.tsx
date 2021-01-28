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
import { ListOptionsScreenProps, Details } from "./interfaces";
import InputRow from "./InputRow";

export default function ListOptionsScreen({
	lists,
	onSwitch,
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
					backgroundColor: "powderblue",
				}}
			>
				<FlatList
					style={{}}
					data={lists}
					renderItem={({ item, index, separators }) => (
						<ListItem
							onPress={(text: string) => onSwitch(text)}
							text={item.id}
							onDelete={onDelete}
							details={[{ items: item.items.length }]}
						/>
					)}
					keyExtractor={(item, index) => item + index.toString()}
				/>
			</View>
			<InputRow onSubmit={onSubmit} />
		</View>
	);
}
