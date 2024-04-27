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
