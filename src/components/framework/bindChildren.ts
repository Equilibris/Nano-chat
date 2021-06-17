export const bindChildren = (source: HTMLElement, portal: HTMLElement) => {
	for (const child of source.children) portal.appendChild(child)

	source.appendChild = portal.appendChild
	source.removeChild = portal.removeChild
	source.replaceChild = portal.replaceChild

	Object.defineProperty(source, 'childElementCount', {
		get: () => portal.childElementCount,
	})
	Object.defineProperty(source, 'firstElementChild', {
		get: () => portal.firstElementChild,
	})
	Object.defineProperty(source, 'lastElementChild', {
		get: () => portal.lastElementChild,
	})
	Object.defineProperty(source, 'children', { get: () => portal.children })
	Object.defineProperty(source, 'lastChild', { get: () => portal.lastChild })
	Object.defineProperty(source, 'firstChild', { get: () => portal.firstChild })
	Object.defineProperty(source, 'childNodes', { get: () => portal.childNodes })
}
