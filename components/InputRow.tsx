import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { InputRowProps } from "./interfaces";
import React, { useEffect, useState } from "react";
import { AddButton } from "./Buttons";

export default function InputRow({ onSubmit }: InputRowProps) {
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
