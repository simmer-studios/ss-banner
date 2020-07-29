// TORCH ==========================================
;(function main() {
	const banner = document.querySelector('.dark-bg')
	const torch = document.querySelector('.light-bg')
	const startButton = document.querySelector('.start-button')

	const minTorchSize = 0
	const maxTorchSize = 20

	let torchSize = maxTorchSize
	let clientX, clientY
	let touched = false

	function moveTorch(event) {
		if (event.changedTouches && event.changedTouches.length > 0) {
			clientX = event.changedTouches[0].clientX
			clientY = event.changedTouches[0].clientY
		} else {
			clientX = event.clientX
			clientY = event.clientY
		}

		torch.style.clipPath = `circle(${torchSize}% at ${clientX}px ${clientY}px)`
	}

	function mouseMoveHandler(event) {
		moveTorch(event)
	}

	function touchStartHandler(event) {
		event.preventDefault()

		if (touched) {
			banner.removeEventListener('mousemove', mouseMoveHandler)
			banner.removeEventListener('touchstart', touchStartHandler)
			banner.removeEventListener('touchmove', touchMoveHandler)

			torch.style.clipPath = `circle(0% at ${clientX}px ${clientY}px)`
		} else {
			touched = true
			setTimeout(() => {
				touched = false
			}, 500)
			moveTorch(event)
		}
	}

	function touchMoveHandler(event) {
		moveTorch(event)
	}

	startButton.addEventListener('click', (event) => {
		moveTorch(event)
		startButton.style.visibility = 'hidden'

		banner.addEventListener('mousemove', mouseMoveHandler)
		banner.addEventListener('touchstart', touchStartHandler)
		banner.addEventListener('touchmove', touchMoveHandler)
	})
})()

// TYPEWRITER ======================================
;(function typewriter() {
	const slogan = document.querySelector('.slogan')

	let textCharIndex = 0
	let textArrayIndex = 0
	const texts = [
		'Designs that suit your taste',
		'Execution sliced to precision',
		'A bucket of fresh ideas',
		'Mixed in a pot of creativity',
		'Let it simmer',
	]

	const maxSpeed = 120
	const minSpeed = 60
	const writeDelay = 350
	const backspaceSpeed = 40
	const backspaceDelay = 1250

	function getRandomSpeed() {
		return Math.floor(Math.random() * (maxSpeed - minSpeed) + minSpeed)
	}

	function backspace() {
		if (slogan.innerHTML.length > 0) {
			slogan.innerHTML = slogan.innerHTML.substr(0, slogan.innerHTML.length - 1)
			setTimeout(backspace, backspaceSpeed)
		} else {
			if (textArrayIndex < texts.length - 1) {
				textArrayIndex += 1
			} else {
				textArrayIndex = 0
			}

			setTimeout(write, writeDelay)
		}
	}

	function write() {
		if (textCharIndex < texts[textArrayIndex].length) {
			slogan.innerHTML += texts[textArrayIndex].charAt(textCharIndex)
			setTimeout(write, getRandomSpeed())
			textCharIndex += 1
		} else {
			slogan.innerHTML += '_'
			textCharIndex = 0
			setTimeout(backspace, backspaceDelay)
		}
	}

	setTimeout(write, writeDelay)
})()
