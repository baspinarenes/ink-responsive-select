import {ForegroundColorName} from 'chalk';

export type Option = {
	label: string;
	value: string;
	checked: boolean;
};

export type ResponsiveSelectSubmittedEventParams = {
	selectedOptions: Option[];
	unselectedOptions: Option[];
};

export type ResponsiveSelectProps = {
	sortBy?: 'desc' | 'asc';
	options: Option[];
	loading?:
		| boolean
		| {
				text: string;
				color: ForegroundColorName;
		  };
	column?: number | 'auto';
	onChanged?: (changedOption: Option) => void;
	onSubmitted?: ({
		selectedOptions,
		unselectedOptions,
	}: ResponsiveSelectSubmittedEventParams) => void;
};
