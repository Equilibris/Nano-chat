if ('serviceWorker' in navigator)
	window.addEventListener('load', async () => {
		await navigator.serviceWorker.register('/cacheWorker.js')
	})
