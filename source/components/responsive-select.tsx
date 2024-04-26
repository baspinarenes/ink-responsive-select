import React, {useState} from 'react';
import {Box, useApp, useInput} from 'ink';
import {ResponsiveSelectProps} from '../types.js';
import {Instructions} from './instructions.js';
import {useDynamicColumn} from '../hooks/useDynamicColumn.js';
import {useOptions} from '../hooks/useOptions.js';
import {Column} from './column.js';

export const ResponsiveSelect: React.FC<ResponsiveSelectProps> = props => {
	const {options, initial, column = 'auto', onChanged, onSubmitted} = props;

	const [focusedIndex, setFocusedIndex] = useState(0);
	const {selectOptions, setSelectOptions} = useOptions({options, initial});
	const {columnCount, columnItemCount} = useDynamicColumn(options, column);
	const {exit} = useApp();
	const columnArray = Array.from({length: columnCount}, (_, i) => i);

	useInput((input, key) => {
		// Exit
		if (input === 'q' || key.escape || key.backspace) {
			exit();
		}

		// Navigate options to the top
		if (key.upArrow) {
			setFocusedIndex(focusedIndex - 1 < 0 ? 0 : focusedIndex - 1);
		}

		// Navigate options to the bottom
		if (key.downArrow) {
			setFocusedIndex(
				focusedIndex >= options.length - 1 ? focusedIndex : focusedIndex + 1,
			);
		}

		// Navigate options to the right
		if (key.rightArrow) {
			setFocusedIndex(
				focusedIndex + columnItemCount + 1 > options.length
					? focusedIndex
					: focusedIndex + columnItemCount,
			);
		}

		// Navigate options to the left
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

		// Select option
		// if (input === ' ') {
		// 	const focusedOption = options[focusedIndex]!;
		// 	const isSelected = has(selectedOptions, focusedOption);

		// 	if (isSelected) {
		// 		setSelectedOptions(deleteFrom(selectedOptions, focusedOption));
		// 	} else {
		// 		setSelectedOptions(addTo(selectedOptions, focusedOption));
		// 	}

		// 	onChanged && onChanged(selectedOptions);
		// }

		// Finish selection
		if (key.return) {
			onSubmitted(selectOptions);
		}
	});

	const handleChange = (checked: boolean, label: string) => {
		const modifiedSelectOptions = selectOptions.map(option => {
			if (option.label === label) return {...option, checked};
			return option;
		});

		onChanged(modifiedSelectOptions);
	};

	const handleSubmit = (checked: boolean, label: string) => {
		console.log('submit', checked, label);
	};

	return (
		<Box flexDirection="column" gap={1}>
			<Box flexDirection="row" flexWrap="wrap" columnGap={5}>
				{columnArray.map(columNo => (
					<Column
						key={columNo}
						columnNo={columNo}
						options={selectOptions.slice(
							columNo * columnItemCount,
							columNo * columnItemCount + columnItemCount,
						)}
						focusedIndex={focusedIndex}
						onChanged={handleChange}
						onSubmitted={handleSubmit}
					/>
				))}
			</Box>
			<Instructions />
		</Box>
	);
};
