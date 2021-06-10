import template from './template.html'
import x from './style.module.scss'

customElements.define(
	'nc-nav',
	class extends HTMLElement {
		constructor() {
			super()

			const shadowRoot = this.attachShadow({ mode: 'open' })

			shadowRoot.innerHTML = template

			const link = document.createElement('link')

			link.rel = 'stylesheet'
			link.href = x
			link.type = 'text/css'

			shadowRoot.appendChild(link)
		}
	}
)
