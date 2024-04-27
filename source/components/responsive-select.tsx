import React, {useState} from 'react';
import {Box, useApp, useInput} from 'ink';
import {Option, ResponsiveSelectProps} from '../types.js';
import {Instructions} from './instructions.js';
import {useDynamicColumn} from '../hooks/useDynamicColumn.js';
import {Column} from './column.js';
import {CheckboxEventParams} from 'ink-checkbox';

export const ResponsiveSelect: React.FC<ResponsiveSelectProps> = props => {
	const {options, column = 'auto', onChanged, onSubmitted} = props;

	const [focusedIndex, setFocusedIndex] = useState(0);
	const [selectOptions, setSelectOptions] = useState(options);
	const {columnCount, columnItemCount, columnData} = useDynamicColumn(
		selectOptions,
		column,
	);
	const {exit} = useApp();
	const columnArray = Array.from({length: columnCount}, (_, i) => i);

	useInput((input, key) => {
		if (input === 'q' || key.escape || key.backspace) {
			exit();
		}

		if (key.upArrow) {
			setFocusedIndex(focusedIndex - 1 < 0 ? 0 : focusedIndex - 1);
		}

		if (key.downArrow) {
			setFocusedIndex(
				focusedIndex >= options.length - 1 ? focusedIndex : focusedIndex + 1,
			);
		}

		if (key.rightArrow) {
			setFocusedIndex(
				focusedIndex + columnItemCount + 1 > options.length
					? focusedIndex
					: focusedIndex + columnItemCount,
			);
		}

		if (key.leftArrow) {
			setFocusedIndex(
				focusedIndex - columnItemCount < 0
					? focusedIndex
					: focusedIndex - columnItemCount,
			);
		}

		if (input.toLowerCase() === 'a') {
			setSelectOptions(
				options.map(option => ({
					...option,
					checked:
						selectOptions.filter(o => o.checked).length !== options.length,
				})),
			);
		}

		if (key.return) {
			onSubmitted &&
				onSubmitted({
					selectedOptions: selectOptions.filter(option => option.checked),
					unselectedOptions: selectOptions.filter(option => !option.checked),
				});
		}
	});

	const handleCheckboxChange = ({label, checked}: CheckboxEventParams) => {
		const focusedOption = selectOptions.find(
			option => option.label === label,
		) as Option;
		focusedOption.checked = checked;
		updateSelectOptions(focusedOption);
		onChanged && onChanged({changedOption: focusedOption});
	};

	const updateSelectOptions = (changedOption: Option) => {
		const modifiedSelectOptions = [...selectOptions].map(option => {
			if (option.label === changedOption.label)
				return {...option, checked: option.checked};
			return option;
		});

		setSelectOptions(modifiedSelectOptions);
	};

	return (
		<Box flexDirection="column" gap={1}>
			<Box flexDirection="row" flexWrap="wrap" columnGap={5}>
				{columnArray.map(columNo => (
					<Column
						key={columNo}
						columnNo={columNo}
						columItemCount={columnItemCount}
						options={columnData[columNo] || []}
						focusedIndex={focusedIndex}
						onChanged={handleCheckboxChange}
					/>
				))}
			</Box>
			<Instructions />
		</Box>
	);
};
