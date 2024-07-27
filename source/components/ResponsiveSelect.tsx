import React, {useEffect, useState} from 'react';
import {Box, Text, useApp, useInput} from 'ink';
import {Option, ResponsiveSelectProps} from '../types.js';
import {Instructions} from './Insturctions.js';
import {useDynamicColumn} from '../hooks/useDynamicColumn.js';
import {Column} from './Column.js';
import {CheckboxEventParams} from 'ink-checkbox';
import {sortByAlphabetically} from '../utils.js';

export const ResponsiveSelect: React.FC<ResponsiveSelectProps> = props => {
	const {
		options,
		column = 'auto',
		loading: loadingProps,
		sortBy = false,
		onChanged,
		onSubmitted,
	} = props;

	const sortedOptions = sortBy
		? options.sort((prev, curr) =>
				sortByAlphabetically(sortBy, prev.label, curr.label),
		  )
		: options;

	const [focusedIndex, setFocusedIndex] = useState(0);
	const [selectOptions, setSelectOptions] = useState(sortedOptions);
	const {columnCount, columnItemCount, columnData} = useDynamicColumn(
		selectOptions,
		column,
	);
	const {exit} = useApp();
	const columnArray = Array.from({length: columnCount}, (_, i) => i);

	const loading = {
		enabled: loadingProps,
		text:
			typeof loadingProps === 'object'
				? loadingProps.text
				: 'Options is loading...',
		color:
			typeof loadingProps === 'object'
				? loadingProps.color ?? 'yellow'
				: 'yellow',
	};

	useEffect(() => setSelectOptions(sortedOptions), [options]);

	useInput((input, key) => {
		if (input === 'q' || key.escape || key.backspace) exit();

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

	const hasOptions = selectOptions?.length > 0;

	return (
		<Box flexDirection="column" gap={1}>
			{!hasOptions && loading.enabled && (
				<Text italic dimColor color={loading.color}>
					{loading.text}
				</Text>
			)}
			{hasOptions && (
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
			)}
			<Instructions />
		</Box>
	);
};
