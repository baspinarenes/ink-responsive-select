import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {ResponsiveSelect, Option} from '../source/index.js';
import {preparePlayground} from '../source/utils.js';
import BigText from 'ink-big-text';

preparePlayground();

const options = Array.from({length: 20}, (_, i) => ({
	label: `Option ${i + 1}`,
	value: `option-${i + 1}`,
	checked: false,
}));

const EventsExample = () => {
	const [checkedOptions, setCheckedOptions] = useState<Option[]>();
	const [lastChangedOption, setLastChangedOption] = useState<Option>();

	return (
		<Box flexDirection="column" margin={1}>
			<BigText text="Demo: Events" font="tiny" colors={['blue']} />
			<ResponsiveSelect
				options={options}
				onChanged={({changedOption}) => setLastChangedOption(changedOption)}
				onSubmitted={({selectedOptions}) => setCheckedOptions(selectedOptions)}
			/>
			<Box flexDirection="column" marginTop={1}>
				<Text color="green">
					Last changed option: {lastChangedOption?.label}
					{!lastChangedOption
						? ''
						: lastChangedOption.checked
						? ' (checked)'
						: ' (unchecked)'}
				</Text>
				<Text color="green">
					Checked options: {checkedOptions?.map(o => o.label).join(', ')}
				</Text>
			</Box>
		</Box>
	);
};

render(<EventsExample />);
