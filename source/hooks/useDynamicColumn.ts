import {Option} from '../types.js';
import {useStdoutDimensions} from './useStdoutDimensions.js';

export function useDynamicColumn(options: Option[], column: number | 'auto') {
	const {columns} = useStdoutDimensions();
	const columnCount = column === 'auto' ? Math.round(columns / 40) : column;
	const columnItemCount = Math.round(options.length / columnCount);

	return {
		columnCount,
		columnItemCount,
	};
}
