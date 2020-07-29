const vh = window.innerHeight * 0.01
document.documentElement.style.setProperty('--vh', `${vh}px`)

// TORCH ==========================================
;(function main() {
	const banner = document.querySelector('.dark-bg')
	const torch = document.querySelector('.light-bg')
	const switchButton = document.getElementById('switch-button')

	const minTorchSize = 0
	const maxTorchSize = 20

	let torchSize = minTorchSize
	let clientX, clientY
	let touched = false

	// TORCH MANIPULATION ==================
	function updateClipPath() {
		torch.style['-webkit-clip-path'] = `circle(${torchSize}% at ${clientX}px ${clientY}px)`
		torch.style.clipPath = `circle(${torchSize}% at ${clientX}px ${clientY}px)`
	}

	function increaseTorchSize() {
		if (torchSize < maxTorchSize) {
			torchSize += 1
			updateClipPath()
			requestAnimationFrame(increaseTorchSize)
		} else {
			switchButton.innerHTML = 'Double Tap Anywhere to Stop'
			switchButton.classList.add('on')
		}
	}

	function decreaseTorchSize() {
		if (torchSize > minTorchSize) {
			torchSize -= 1
			updateClipPath()
			requestAnimationFrame(decreaseTorchSize)
		} else {
			switchButton.innerHTML = 'Tap Here to Start'
			switchButton.classList.remove('on')
		}
	}

	function moveTorch(event) {
		if (event.changedTouches && event.changedTouches.length > 0) {
			clientX = event.changedTouches[0].clientX
			clientY = event.changedTouches[0].clientY - 75
		} else {
			clientX = event.clientX
			clientY = event.clientY
		}

		updateClipPath()
	}

	function turnOnTorch(event) {
		moveTorch(event)
		increaseTorchSize()

		banner.addEventListener('click', mouseClickHandler)
		banner.addEventListener('mousemove', mouseMoveHandler)
		banner.addEventListener('touchstart', touchStartHandler)
		banner.addEventListener('touchmove', touchMoveHandler)
	}

	function turnOffTorch() {
		decreaseTorchSize()

		banner.addEventListener('click', mouseClickHandler)
		banner.removeEventListener('mousemove', mouseMoveHandler)
		banner.removeEventListener('touchstart', touchStartHandler)
		banner.removeEventListener('touchmove', touchMoveHandler)
	}

	// MOUSE ==========================
	function mouseClickHandler() {
		console.log('Mouse Click')

		if (touched) {
			turnOffTorch()
		} else {
			touched = true
			setTimeout(function () {
				touched = false
			}, 400)
		}
	}

	function mouseMoveHandler(event) {
		moveTorch(event)
	}

	// TOUCH ==========================
	function touchStartHandler(event) {
		event.preventDefault()

		if (touched) {
			turnOffTorch()
		} else {
			touched = true
			setTimeout(function () {
				touched = false
			}, 400)
			moveTorch(event)
		}
	}

	function touchMoveHandler(event) {
		moveTorch(event)
	}

	// SWITCH BUTTON ==================================
	switchButton.addEventListener('click', function (event) {
		if (!switchButton.classList.contains('on')) {
			turnOnTorch(event)
		}
	})

	switchButton.addEventListener('touchstart', function (event) {
		event.preventDefault()
		if (!switchButton.classList.contains('on')) {
			turnOnTorch(event)
		}
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
