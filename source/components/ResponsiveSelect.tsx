import React, {useEffect, useState} from 'react';
import {Box, Text, useApp, useInput} from 'ink';
import {Option, ResponsiveSelectProps} from '../types.js';
import {Instructions} from './Insturctions.js';
import {useDynamicColumn} from '../hooks/useDynamicColumn.js';
import {sortByAlphabetically} from '../utils.js';
import {Checkbox, CheckboxEventParams} from 'ink-checkbox';

export const ResponsiveSelect: React.FC<ResponsiveSelectProps> = props => {
	const {
		options,
		column = 'auto',
		loading: loadingProps,
		sortBy = false,
		onChanged,
		onSubmitted,
	} = props;

	const manipulatedOptions = sortBy
		? options.sort((prev, curr) =>
				sortByAlphabetically(sortBy, prev.label, curr.label),
		  )
		: options;

	const [focusedIndex, setFocusedIndex] = useState(0);
	const [selectOptions, setSelectOptions] = useState(manipulatedOptions);
	const {columnHeight, columnItemCount} = useDynamicColumn(
		selectOptions,
		column,
	);

	const {exit} = useApp();

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

	useEffect(() => setSelectOptions(manipulatedOptions), [options]);

	useInput((input, key) => {
		if (input === 'q' || key.escape || key.backspace) exit();

		if (key.upArrow && focusedIndex > 0) {
			setFocusedIndex(focusedIndex - 1);
		}

		if (key.downArrow && focusedIndex < options.length - 1) {
			setFocusedIndex(focusedIndex + 1);
		}

		if (key.rightArrow && focusedIndex + columnItemCount < options.length) {
			setFocusedIndex(focusedIndex + columnItemCount);
		}

		if (key.leftArrow && focusedIndex - columnItemCount >= 0) {
			setFocusedIndex(focusedIndex - columnItemCount);
		}

		if (input.toLowerCase() === 'a') selectAllOptions();

		if (key.return && selectOptions.some(o => o.checked) && onSubmitted) {
			onSubmitted({
				selectedOptions: selectOptions.filter(option => option.checked),
				unselectedOptions: selectOptions.filter(option => !option.checked),
			});
		}
	});

	const selectAllOptions = () => {
		const isAllChecked =
			selectOptions.filter(o => o.checked).length === options.length;
		onChanged &&
			onChanged({label: 'All options', value: 'all', checked: !isAllChecked});
		setSelectOptions(
			options.map(option => ({...option, checked: !isAllChecked})),
		);
	};

	const selectOption = (label: string, newValue: boolean) => {
		setSelectOptions(() =>
			selectOptions.map(option => {
				if (option.label === label) {
					return {...option, checked: newValue};
				}
				return option;
			}),
		);
	};

	const handleCheckboxChange = ({label}: CheckboxEventParams) => {
		const focusedOption = {
			...(selectOptions.find(option => option.label === label) as Option),
		};
		const newValue = !focusedOption.checked;
		selectOption(label, newValue);
		onChanged && onChanged({...focusedOption, checked: newValue});
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
				<Box
					flexDirection="column"
					flexWrap="wrap"
					height={columnHeight}
					columnGap={5}
				>
					{selectOptions.map((option, index) => (
						<Checkbox
							key={option.value}
							label={option.label}
							checked={option.checked}
							focused={focusedIndex === index}
							onChanged={handleCheckboxChange}
						/>
					))}
				</Box>
			)}
			<Instructions />
		</Box>
	);
};
