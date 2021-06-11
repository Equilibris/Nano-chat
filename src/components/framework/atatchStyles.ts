export const attachStyleLink = <T extends Element | ShadowRoot>(
	url: string,
	element: T
) => {
	const link = document.createElement('link')

	link.rel = 'stylesheet'
	link.href = url
	link.type = 'text/css'

	element.appendChild(link)
}
