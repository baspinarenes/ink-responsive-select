import React from 'react';
import {Text} from 'ink';

export const Instructions: React.FC = () => {
	return (
		<Text italic>
			Press {'<Arrows>'} to navigate, {'<Space>'} to select, {'<Enter>'} to
			submit, {'<a>'} to select or deselect all, {'<q>'} to exit.
		</Text>
	);
};
