import {Option} from '../types.js';
import {useStdoutDimensions} from './useStdoutDimensions.js';

export function useDynamicColumn(options: Option[], column: number | 'auto') {
	const {columns} = useStdoutDimensions();

	const columnWidth = options.reduce((acc, option) => {
		return Math.max(acc, option.label.length);
	}, 0);

	const columnCount =
		column === 'auto'
			? Math.round(columns / ((columnWidth * 3) / 2))
			: Math.min(Math.round(columns / ((columnWidth * 3) / 2)), column);

	const columnItemCount = Math.ceil(options.length / columnCount);

	return {
		columnItemCount,
		columnHeight: columnItemCount,
	};
}
