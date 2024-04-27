import React, {useState} from 'react';
import {Box, useApp, useInput} from 'ink';
import {MappedOption, ResponsiveSelectProps} from '../types.js';
import {Instructions} from './instructions.js';
import {useDynamicColumn} from '../hooks/useDynamicColumn.js';
import {useOptions} from '../hooks/useOptions.js';
import {Column} from './column.js';
import {CheckboxEventParams} from 'ink-checkbox';

export const ResponsiveSelect: React.FC<ResponsiveSelectProps> = props => {
	const {options, initial, column = 'auto', onChanged, onSubmitted} = props;

	const [focusedIndex, setFocusedIndex] = useState(0);
	const {selectOptions, setSelectOptions} = useOptions({options, initial});
	const {columnCount, columnItemCount} = useDynamicColumn(options, column);
	const {exit} = useApp();
	const columnArray = Array.from({length: columnCount}, (_, i) => i);

	useInput((input, key) => {
		if (input === 'q' || key.escape || key.backspace) {
			exit();
		}

		// Navigate options to the top
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
					checked: selectOptions.length !== options.length,
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
		) as MappedOption;
		updateSelectOptions(focusedOption, checked);
		onChanged && onChanged({changedOption: focusedOption});
	};

	const updateSelectOptions = (
		changedOption: MappedOption,
		checked: boolean,
	) => {
		const modifiedSelectOptions = [...selectOptions].map(option => {
			if (option.label === changedOption.label)
				return {...option, checked: checked};
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
						options={selectOptions.slice(
							columNo * columnItemCount,
							columNo * columnItemCount + columnItemCount,
						)}
						focusedIndex={focusedIndex}
						onChanged={handleCheckboxChange}
					/>
				))}
			</Box>
			<Instructions />
		</Box>
	);
};
