import React, {useEffect, useState} from 'react';
import {render, Box, Text} from 'ink';
import {ResponsiveSelect, Option} from '../source/index.js';
import {preparePlayground} from '../source/utils.js';
import BigText from 'ink-big-text';

preparePlayground();

const options = Array.from({length: 26}, (_, i) => ({
	label: `Opt${i + 1}`,
	value: `option-${i + 1}`,
	checked: false,
}));

const LoadingExample = () => {
	const [selectOptions, setSelectOptions] = useState<typeof options>([]);
	const [checkedOptions, setCheckedOptions] = useState<Option[]>();

	useEffect(() => {
		setTimeout(() => {
			setSelectOptions(options);
		}, 2000);
	}, []);

	return (
		<Box flexDirection="column" margin={1} gap={1}>
			<BigText text="Demo: Loading" font="tiny" colors={['blue']} />
			<Text>Please resize terminal width and use arrow keys for navigate.</Text>
			<ResponsiveSelect
				options={selectOptions}
				column="auto"
				loading={{
					color: 'magentaBright',
					text: 'Example loading text...',
				}}
				onSubmitted={({selectedOptions}) => setCheckedOptions(selectedOptions)}
			/>
			<Text color="green">
				Checked options: {checkedOptions?.map(o => o.label).join(', ')}
			</Text>
		</Box>
	);
};

render(<LoadingExample />);
