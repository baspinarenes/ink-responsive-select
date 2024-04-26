export type ResponsiveSelectProps = {
	options: Option[];
	initial?: string[];
	column?: number | 'auto';
	onChanged?: (selectedOptions: MappedOption[]) => void;
	onSubmitted?: (selectedOptions: MappedOption[]) => void;
};

export type Option = {
	label: string;
	value: string;
};

export type MappedOption = Option & {
	checked: boolean;
};
