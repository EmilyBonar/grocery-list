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
	title: string;
	items: string[];
}

interface ListOptionsScreenProps {
	list: List;
	onSubmit: Function;
	onDelete: Function;
}

export default function ListOptionsScreen({
	list,
	onSubmit,
	onDelete,
}: ListOptionsScreenProps) {
	return <View></View>;
}
