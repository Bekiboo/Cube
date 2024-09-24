export function generatePyramid(PYRAMID_HEIGHT, STONE_HEIGHT, STONE_LENGTH) {
	const pyramid = {
		height: PYRAMID_HEIGHT,
		stoneHeight: STONE_HEIGHT,
		stoneLength: STONE_LENGTH,
		stones: []
	};

	for (let i = 0; i < PYRAMID_HEIGHT; i++) {
		for (let j = 0; j < PYRAMID_HEIGHT - i; j++) {
			for (let k = 0; k < PYRAMID_HEIGHT - i; k++) {
				pyramid.stones.push([
					j * STONE_LENGTH * 2 + STONE_LENGTH * i,
					i * STONE_HEIGHT * 2 + STONE_HEIGHT,
					k * STONE_LENGTH * 2 + STONE_LENGTH * i
				]);
			}
		}
	}

	return pyramid;
}
