import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {Option, ResponsiveSelect} from '../source/index.js';
import {preparePlayground} from '../source/utils.js';
import BigText from 'ink-big-text';

preparePlayground();

const options = Array.from({length: 20}, (_, i) => ({
	label: `Project ${i + 1}`,
	value: `project-${i + 1}`,
	checked: i % 6 === 0,
}));

const StaticExample = () => {
	const [checkedOptions, setCheckedOptions] = useState<Option[]>();
	const [lastChanged, setLastChanged] = useState<Option>();

	return (
		<Box flexDirection="column" margin={1} gap={1}>
			<BigText text="Demo: Default Value" font="tiny" colors={['blue']} />
			<ResponsiveSelect
				sortBy="asc"
				column={3}
				options={options}
				onChanged={changedOption => setLastChanged(changedOption)}
				onSubmitted={({selectedOptions}) => setCheckedOptions(selectedOptions)}
			/>
			<Text color="green">
				Submitted checked options:{' '}
				{checkedOptions?.map(o => o.label).join(', ')}
			</Text>
			<Text color="green">
				Last checked: {lastChanged?.label} -{' '}
				{lastChanged ? String(lastChanged?.checked) : ''}
			</Text>
		</Box>
	);
};

render(<StaticExample />);
