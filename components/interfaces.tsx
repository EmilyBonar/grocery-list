export interface List {
	id: string;
	items: string[];
}

export interface ListScreenProps {
	list: List;
	onSubmit: Function;
	onDelete: Function;
}

export interface ListOptionsScreenProps {
	lists: List[];
	onSwitch: Function;
	onSubmit: Function;
	onDelete: Function;
}

export interface InputRowProps {
	onSubmit: Function;
}

export interface ListItemProps {
	text: string;
	details?: object[];
	onPress: Function;
	onLongPress?: Function;
	onDelete: Function;
}
