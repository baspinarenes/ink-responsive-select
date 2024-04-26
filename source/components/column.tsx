import React from 'react';
import {Box} from 'ink';
import {MappedOption} from '../types.js';
import Checkbox from 'ink-checkbox';

export const Column: React.FC<ColumnProps> = props => {
	const {
		columnNo,
		columItemCount,
		options,
		focusedIndex,
		onChanged,
		onSubmitted,
	} = props;

	return (
		<Box key={columnNo} flexDirection="column">
			{options.map(option => (
				<Checkbox
					key={option.value}
					label={option.label}
					focused={
						focusedIndex === columnNo * columItemCount + options.indexOf(option)
					}
					onChanged={onChanged}
					onSubmitted={onSubmitted}
				/>
			))}
		</Box>
	);
};

export type ColumnProps = {
	columnNo: number;
	columItemCount: number;
	focusedIndex: number;
	options: MappedOption[];
	onChanged?: (selected: boolean, label: string, index?: number) => void;
	onSubmitted?: (selected: boolean, label: string, index?: number) => void;
};
