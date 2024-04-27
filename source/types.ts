export type Option = {
	label: string;
	value: string;
};

export type MappedOption = Option & {
	checked: boolean;
};

export type ResponsiveSelectSubmittedEventParams = {
	selectedOptions: MappedOption[];
	unselectedOptions: MappedOption[];
};

export type ResponsiveSelectChangedEventParams = {
	changedOption: MappedOption;
};

export type ResponsiveSelectProps = {
	options: Option[];
	initial?: string[];
	column?: number | 'auto';
	onChanged?: ({changedOption}: ResponsiveSelectChangedEventParams) => void;
	onSubmitted?: ({
		selectedOptions,
		unselectedOptions,
	}: ResponsiveSelectSubmittedEventParams) => void;
};
