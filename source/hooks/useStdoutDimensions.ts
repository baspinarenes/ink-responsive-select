import {useStdout} from 'ink';
import {useEffect, useState} from 'react';

export function useStdoutDimensions() {
	const {stdout} = useStdout();
	const [dimensions, setDimensions] = useState([stdout.columns, stdout.rows]);

	useEffect(() => {
		const handler = () => {
			setDimensions([stdout.columns, stdout.rows]);
		};
		stdout.on('resize', handler);
		return () => {
			stdout.off('resize', handler);
		};
	}, [stdout]);

	return {
		columns: dimensions[0] as number,
		rows: dimensions[1] as number,
	};
}
