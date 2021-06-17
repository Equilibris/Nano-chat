import { Dependency } from 'framework'

export class CustomComponent<
	Dependencies extends { [key: string]: Dependency<any> }
> extends HTMLElement {
	context: Dependencies

	connectedCallback() {}
	disconnectedCallback() {}
	adoptedCallback() {}
	attributeChangedCallback(name: string, oldValue: string, newValue: string) {}

	acquireContent<T>(name: string) {
		type target = CustomComponent<{ [name: string]: Dependency<T> }>

		let parentElement = this.parentElement

		do {
			if ((parentElement as target).context?.[name]) {
				return (parentElement as target).context[name]
			}

			parentElement = parentElement.parentElement
		} while (parentElement)
		return null
	}
}
