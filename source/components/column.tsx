import React from 'react';
import {Box} from 'ink';
import {MappedOption} from '../types.js';
import {Checkbox, CheckboxEventParams} from 'ink-checkbox';

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
					disableInputHandler
					key={option.value}
					label={option.label}
					focused={
						focusedIndex === columnNo * columItemCount + options.indexOf(option)
					}
					styles={{
						icon: {
							checked: 'bullet',
							focused: 'circle',
							normal: 'circle',
						},
					}}
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
	onChanged?: (props: CheckboxEventParams) => void;
	onSubmitted?: (props: CheckboxEventParams) => void;
};
