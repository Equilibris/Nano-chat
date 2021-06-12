import { EventEmitter } from './eventEmitter'

export class Dependency<State> extends EventEmitter<{
	stateUpdate: (newState: State) => void
}> {
	get state(): State {
		return this._state
	}
	set state(newState: State) {
		this._state = newState
		this.dispatchEvent('stateUpdate', newState)
	}

	constructor(public _state: State) {
		super({ stateUpdate: [] })
		this.state = _state
	}
}
