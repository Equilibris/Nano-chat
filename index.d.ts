declare module '*.html' {
	const content: string

	export default content
}

declare module '*.template.ejs' {
	import { TemplateExecutor } from 'lodash'

	const content: TemplateExecutor

	export default content
}

declare module '*.scss' {
	const content: any

	export default content
}
