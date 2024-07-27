import React from 'react';
import {Box, Text} from 'ink';

export const Instructions: React.FC = () => {
	return (
		<Box marginBottom={1}>
			<Text italic dimColor>
				Press {'<Space>'} to select, {'<Enter>'} to submit, {'<a>'} to
				select/deselect all, {'<q>'} to exit.
			</Text>
		</Box>
	);
};
