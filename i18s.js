/**
 * @typedef {object} Index
 * @property {string} title
 * @property {string} description
 */

/**
 * @typedef {object} SignIn
 * @property {string} title
 * @property {string} description
 */

/**
 * @typedef {object} Content
 * @property {Index} index
 * @property {SignIn} signIn
 */

/**
 * @typedef {object} Config
 * @property {string} title
 * @property {string} home
 * @property {string} signIn
 * @property {string} myMessages
 * @property {Content} content
 */

/**
 * @type {Config}
 */
const enConfig = {
	title: 'Nano Chat',
	home: 'Home',
	myMessages: 'My messages',
	signIn: 'Sign in',

	content: {
		index: {
			title:
				'Welcome to nano-chat: ' +
				'a minimal chat application ' +
				'written in pure JavaScript',
			description:
				'Nano-chat is a decentralized ' +
				'peer-to-peer chat application ' +
				'designed to be simple to use. ' +
				'This application is solely for ' +
				'learning gun &mdash; so no-matter ' +
				'how honored I would be if you ' +
				'tried it out do not publish any ' +
				'personal information incase I ' +
				'do a stupid and leek your ' +
				'personal data :P',
		},
		signIn: {
			title: 'Sign in',
		},
	},
}
const noConfig = {
	title: 'Nano Chat',
	home: 'Hjem',
	myMessages: 'Mine meldinger',
	signIn: 'Log in',

	content: {
		index: {},
	},
}
module.exports = { enConfig, noConfig }
