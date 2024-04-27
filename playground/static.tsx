import React from 'react';
import {render, Box, Text} from 'ink';
import {ResponsiveSelect} from '../source/index.js';
import {preparePlayground} from '../source/utils.js';
import BigText from 'ink-big-text';

preparePlayground();

const options = Array.from({length: 12}, (_, i) => ({
	label: `Long option name ${i + 1}`,
	value: `option-${i + 1}`,
	checked: false,
}));

const StaticExample = () => {
	return (
		<Box flexDirection="column" margin={1} gap={1}>
			<BigText text="Demo: Static" font="tiny" colors={['blue']} />
			<Text>Please resize terminal width and use arrow keys for navigate.</Text>
			<ResponsiveSelect options={options} column={3} />
		</Box>
	);
};

render(<StaticExample />);
