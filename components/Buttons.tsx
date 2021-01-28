import Svg, { Path } from "react-native-svg";
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

interface ButtonProps {
	onPress: Function;
}

export function DeleteButton({ onPress }: ButtonProps) {
	return (
		<Pressable style={{ width: 24, height: 24 }} onPress={() => onPress()}>
			<Svg fill="none" viewBox="0 0 24 24" stroke="darkred">
				<Path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</Svg>
		</Pressable>
	);
}

export function SettingsButton({ onPress }: ButtonProps) {
	return (
		<Pressable
			style={{ width: 24, height: 24, margin: 16 }}
			onPress={() => onPress()}
		>
			<Svg fill="none" viewBox="0 0 24 24" stroke="gray">
				<Path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
				/>
				<Path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
				/>
			</Svg>
		</Pressable>
	);
}

export function AddButton({ onPress }: ButtonProps) {
	return (
		<Pressable
			onPress={() => {
				onPress();
			}}
			style={{ width: 48, height: 48 }}
		>
			<Svg fill="none" viewBox="0 0 24 24" stroke="darkcyan">
				<Path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</Svg>
		</Pressable>
	);
}
