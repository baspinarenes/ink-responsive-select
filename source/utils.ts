import events from 'events';

export function has(arr: any[], value: any) {
	return (
		arr.filter(o => JSON.stringify(o) === JSON.stringify(value)).length > 0
	);
}

export function deleteFrom(arr: any[], value: any) {
	return arr.filter(o => JSON.stringify(o) !== JSON.stringify(value));
}

export function addTo(arr: any[], value: any) {
	return [...arr, value];
}

export function preparePlayground() {
	events.EventEmitter.prototype.setMaxListeners(100);
}

export function sortByAlphabetically(
	sortBy: 'desc' | 'asc',
	a: string,
	b: string,
) {
	const sortByModifier = sortBy === 'desc' ? -1 : 1;

	const parseParts = (str: string) => {
		const regex = /(\d+|\D+)/g; // Sayıları ve harfleri ayıran regex
		return str.match(regex) || [];
	};

	// Parçalara ayırma işlemi
	const partsA = parseParts(a);
	const partsB = parseParts(b);

	for (let i = 0; i < Math.min(partsA.length, partsB.length); i++) {
		const partA = partsA[i];
		const partB = partsB[i];

		if (!isNaN(Number(partA)) && !isNaN(Number(partB))) {
			const numA = Number(partA);
			const numB = Number(partB);
			if (numA !== numB) return sortByModifier * (numA - numB);
		} else {
			if (partA !== partB)
				return sortBy === 'desc'
					? partA!.localeCompare(partB!)
					: partB!.localeCompare(partA!);
		}
	}

	return sortByModifier * (partsA.length - partsB.length);
}
