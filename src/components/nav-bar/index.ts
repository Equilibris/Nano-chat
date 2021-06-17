import template from './nav-bar.template.ejs'
import x from './style.module.scss'
import { attachStyleLink, CustomComponent } from 'framework'

import { user } from '../../dependencies'

customElements.define(
	'nc-nav',
	class NcNavBar extends CustomComponent<{}> {
		accountElem: HTMLElement
		userListener: ['stateUpdate', number]

		static get observedAttributes(): string[] {
			return []
		}

		constructor() {
			super()

			const shadowRoot = this.attachShadow({ mode: 'open' })

			shadowRoot.innerHTML = template({ accountState: user.state })

			this.accountElem = shadowRoot.getElementById('account')

			attachStyleLink(x, shadowRoot)
		}
		connectedCallback() {
			this.userListener = user.addEventListener(
				(state) => (this.accountElem.textContent = state),
				{ catchup: true }
			)
		}
		disconnectedCallback() {
			user.removeEventListener(this.userListener)
		}
	}
)
