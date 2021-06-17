import template from './form.template.ejs'
import formStyles from './form.module.scss'
import {
	attachStyleLink,
	CustomComponent,
	Dependency,
	bindChildren,
} from 'framework'

import { user } from '../../dependencies'

export type FormDependencyContext<Values extends { [key: string]: any }> = {
	values: Values
	errors: Record<keyof Values, string>
}

customElements.define(
	'nc-form',
	class extends CustomComponent<{
		form: Dependency<FormDependencyContext<any>>
	}> {
		formElem: HTMLFormElement
		userListener: ['stateUpdate', number]

		static get observedAttributes(): string[] {
			return ['observe-keys']
		}

		constructor() {
			super()

			this.context = {
				form: new Dependency<FormDependencyContext<any>>({
					values: {},
					errors: {},
				}),
			}

			const shadowRoot = this.attachShadow({ mode: 'open' })

			shadowRoot.innerHTML = template({ accountState: user.state })

			this.formElem = shadowRoot.querySelector('form.form')

			attachStyleLink(formStyles, shadowRoot)
			bindChildren(this, this.formElem)

			this.onsubmit = (ev) => {
				console.log(ev)
			}
		}
	}
)
