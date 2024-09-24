export function handleKeysDown(e, keysPressed) {
	if (e.code === 'KeyD' || e.key === 'ArrowRight') {
		if (keysPressed.includes('right')) return keysPressed;
		keysPressed.push('right');
	}
	if (e.code === 'KeyA' || e.key === 'ArrowLeft') {
		if (keysPressed.includes('left')) return keysPressed;
		keysPressed.push('left');
	}
	if (e.code === 'KeyW' || e.key === 'ArrowUp') {
		if (keysPressed.includes('forward')) return keysPressed;
		keysPressed.push('forward');
	}
	if (e.code === 'KeyS' || e.key === 'ArrowDown') {
		if (keysPressed.includes('backward')) return keysPressed;
		keysPressed.push('backward');
	}
	if (e.code === 'Space') {
		if (keysPressed.includes('jump')) return keysPressed;
		keysPressed.push('jump');
	}

	return keysPressed;
}

export function handleKeysUp(e, keysPressed) {
	if (e.code === 'KeyD' || e.key === 'ArrowRight') {
		keysPressed = keysPressed.filter((key) => key !== 'right');
	}
	if (e.code === 'KeyA' || e.key === 'ArrowLeft') {
		keysPressed = keysPressed.filter((key) => key !== 'left');
	}
	if (e.code === 'KeyW' || e.key === 'ArrowUp') {
		keysPressed = keysPressed.filter((key) => key !== 'forward');
	}
	if (e.code === 'KeyS' || e.key === 'ArrowDown') {
		keysPressed = keysPressed.filter((key) => key !== 'backward');
	}
	if (e.code === 'Space') {
		keysPressed = keysPressed.filter((key) => key !== 'jump');
	}

	return keysPressed;
}
