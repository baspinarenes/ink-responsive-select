import {useState} from 'react';
import {MappedOption, Option} from '../types.js';

export function useOptions({options, initial}: Props) {
	const [selectOptions, setSelectOptions] = useState<MappedOption[]>(
		options.map(option => ({
			label: option.label,
			value: option.value,
			checked: [option.value, option.label].some(v => initial.includes(v)),
		})),
	);

	return {selectOptions, setSelectOptions};
}

type Props = {
	options: Option[];
	initial: string[];
};
