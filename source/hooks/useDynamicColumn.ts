import {Option} from '../types.js';
import {useStdoutDimensions} from './useStdoutDimensions.js';

export function useDynamicColumn(options: Option[], column: number | 'auto') {
	const {columns} = useStdoutDimensions();
	const columnWidth = options.reduce((acc, option) => {
		return Math.max(acc, option.label.length);
	}, 0);
	const columnCount =
		column === 'auto' ? Math.round(columns / (columnWidth + 9)) : column;

	const columnItemCount = Math.ceil(options.length / columnCount);
	const columnData: Option[][] = Array.from({length: columnCount}, () => []);

	for (let i = 0; i < options.length; i++) {
		const columnNo = i % columnCount;
		const option = options[i];
		option && columnData[columnNo]?.push(option);
	}

	return {
		columnCount,
		columnItemCount,
		columnData,
	};
}
