export type ResponsiveSelectProps = {
	options: Option[];
	initial: string[];
	column?: number | 'auto';
	onChanged: (selectedOptions: Option[]) => void;
	onSubmitted: (selectedOptions: Option[]) => void;
};

export type Option = {
	label: string;
	value: string;
};

export type MappedOption = Option & {
	checked: boolean;
};
