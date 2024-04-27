import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {Option, ResponsiveSelect} from '../source/index.js';
import {preparePlayground} from '../source/utils.js';
import BigText from 'ink-big-text';

preparePlayground();

const options = Array.from({length: 20}, (_, i) => ({
	label: `Option ${i + 1}`,
	value: `option-${i + 1}`,
	checked: i % 6 === 0,
}));

const StaticExample = () => {
	const [checkedOptions, setCheckedOptions] = useState<Option[]>();

	return (
		<Box flexDirection="column" margin={1} gap={1}>
			<BigText text="Demo: Default Value" font="tiny" colors={['blue']} />
			<ResponsiveSelect
				options={options}
				column={3}
				onSubmitted={({selectedOptions}) => setCheckedOptions(selectedOptions)}
			/>
			<Text color="green">
				Checked options: {checkedOptions?.map(o => o.label).join(', ')}
			</Text>
		</Box>
	);
};

render(<StaticExample />);
