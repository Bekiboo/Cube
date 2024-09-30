export function generatePyramid(PYRAMID_HEIGHT, STONE_HEIGHT, STONE_LENGTH) {
	const pyramid = {
		height: PYRAMID_HEIGHT,
		stoneHeight: STONE_HEIGHT,
		stoneLength: STONE_LENGTH,
		stones: []
	}

	for (let i = 0; i < PYRAMID_HEIGHT; i++) {
		for (let j = 0; j < PYRAMID_HEIGHT - i; j++) {
			for (let k = 0; k < PYRAMID_HEIGHT - i; k++) {
				pyramid.stones.push([
					j * STONE_LENGTH * 2 + STONE_LENGTH * i,
					i * STONE_HEIGHT * 2 + STONE_HEIGHT,
					k * STONE_LENGTH * 2 + STONE_LENGTH * i
				])
			}
		}
	}

	return pyramid
}

// <!-- PYRAMID -->
// <!-- {#each pyramid.stones as [x, y, z], i}
// 	<T.Group position={[x, y, z]}>
// 		<RigidBody type="dynamic">
// 			<Collider
// 				contactForceEventThreshold={30}
// 				restitution={0.4}
// 				friction={1}
// 				shape={'cuboid'}
// 				args={[pyramid.stoneLength, pyramid.stoneHeight, pyramid.stoneLength]}
// 			/>
// 			<T.Mesh castShadow receiveShadow>
// 				<T.BoxGeometry
// 					args={[pyramid.stoneLength * 2, pyramid.stoneHeight * 2, pyramid.stoneLength * 2]}
// 				/>
// 				<T.MeshStandardMaterial color="red" />
// 			</T.Mesh>
// 		</RigidBody>
// 	</T.Group>
// {/each} -->
