import template from './nav-bar.template.ejs'
import x from './style.module.scss'
import { attachStyleLink } from 'framework'

customElements.define(
	'nc-nav',
	class extends HTMLElement {
		constructor() {
			super()

			const shadowRoot = this.attachShadow({ mode: 'open' })

			shadowRoot.innerHTML = template()

			attachStyleLink(x, shadowRoot)
		}
	}
)
