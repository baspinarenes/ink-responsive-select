export type Option = {
	label: string;
	value: string;
	checked: boolean;
};

export type ResponsiveSelectSubmittedEventParams = {
	selectedOptions: Option[];
	unselectedOptions: Option[];
};

export type ResponsiveSelectChangedEventParams = {
	changedOption: Option;
};

export type ResponsiveSelectProps = {
	options: Option[];
	column?: number | 'auto';
	onChanged?: ({changedOption}: ResponsiveSelectChangedEventParams) => void;
	onSubmitted?: ({
		selectedOptions,
		unselectedOptions,
	}: ResponsiveSelectSubmittedEventParams) => void;
};
