import { RequireExactlyOne } from 'type-fest'

type Await<T> = T extends Promise<infer K> ? K : T

const noopOut = Symbol('noop out')
const noop: any = (...args: any): any => noopOut

type options = { catchup?: boolean; once?: boolean }
// type THasMoreThanOneKey<T, out> = keyof T extends infer a | infer b
// 	? a extends b
// 		? out
// 		: never
// 	: out
type THasMoreThanOneKey<T, out> = T extends RequireExactlyOne<T> ? out : never

export type GetListenerType<T> = T extends EventEmitter<infer Data>
	? [keyof Data, number]
	: never
export class EventEmitter<
	T extends { [type: string]: (...args: any[]) => any }
> {
	public history: { [K in keyof T]: Parameters<T[K]>[] } = {} as any
	constructor(public listeners: { [key in keyof T]: T[key][] }) {
		for (const key in listeners) this.history[key] = []
	}

	addEventListener<K extends keyof T>(
		type: K,
		listener: T[K],
		options: options
	): [K, number]
	addEventListener<K extends keyof T>(type: K, listener: T[K]): [K, number]

	addEventListener<K extends keyof T>(
		listener: THasMoreThanOneKey<T, T[K]>
	): THasMoreThanOneKey<T, [K, number]>
	addEventListener<K extends keyof T>(
		listener: THasMoreThanOneKey<T, T[K]>,
		options: THasMoreThanOneKey<T, options>
	): THasMoreThanOneKey<T, [K, number]>

	addEventListener<K extends keyof T>(
		...args: [K, T[K], options] | [K, T[K]] | [T[K], options] | [T[K]]
	): [K, number] {
		if (typeof args[0] === 'function')
			return this.addEventListener(
				Object.keys(this.listeners)[0] as K,
				...(args as [T[K], options | undefined])
			)
		const [type, listener, _options]: [K, T[K], options | undefined] =
			args as any
		const options = _options ?? {}

		if (options.once && options.catchup && this.history[type].length)
			return void listener(this.history[type][0])

		if (options.once) {
			const ptr: { v: [K, number] } = {
				v: null as any,
			}
			ptr.v = this.addEventListener(
				type,
				function (this: EventEmitter<T>, ...args: any[]) {
					listener(...args)
					this.removeEventListener(ptr.v)
				}.bind(this)
			)
			return ptr.v
		}

		if (options.catchup && this.history[type].length)
			listener(...this.history[type][0])

		this.listeners[type].push(listener)

		return [type, this.listeners[type].length - 1]
	}

	async dispatchEvent<K extends keyof T>(
		type: K,
		...args: Parameters<T[K]>
	): Promise<Await<ReturnType<T[K]>>[]> {
		this.history[type].unshift(args)

		return (
			await Promise.all(this.listeners[type].map((x) => x(...args)))
		).filter((x) => x !== noopOut)
	}

	removeEventListener([type, shift]: [keyof T, number]) {
		this.listeners[type][shift] = noop
	}
}
