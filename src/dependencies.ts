import { Dependency } from './components/framework'

export const user = new Dependency('Hi')

user.addEventListener(
	(state) => {
		setTimeout(() => {
			user.state = state + 'a'
		}, 1000)
	},
	{ catchup: true }
)
