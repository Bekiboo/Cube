<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'
	import { DEG2RAD } from 'three/src/math/MathUtils.js'
	import { handleKeysDown, handleKeysUp } from './keyboardInputHandler'
	import { generatePyramid } from './pyramidGenerator'
	import { AutoColliders, Collider, RigidBody, Attractor, Debug } from '@threlte/rapier'
	import { Vector3, Vector4 } from 'three'
	import Menu from './Menu.svelte'
	import { throttle } from './utils'
	import { Player } from './Player'

	let keysPressed = []

	let strength = 0.0625

	const handleKeyDown = (e) => (keysPressed = handleKeysDown(e, keysPressed))
	const handleKeyUp = (e) => (keysPressed = handleKeysUp(e, keysPressed))

	let player = new Player([0.5, 0.5, 0.5], { x: -5, y: 0, z: -5 }, '#5D9FFF')

	let collider

	let ground = {
		width: 35,
		depth: 35
	}

	useTask((delta) => {
		if (keysPressed.includes('forward')) player.pos.z -= 10 * delta
		if (keysPressed.includes('backward')) player.pos.z += 10 * delta
		if (keysPressed.includes('left')) player.pos.x -= 10 * delta
		if (keysPressed.includes('right')) player.pos.x += 10 * delta

		switch (true) {
			case player.pos.x > ground.width / 2 - player.size[0]:
				player.pos.x = ground.width / 2 - player.size[0]
				break
			case player.pos.x < -ground.width / 2 + player.size[0]:
				player.pos.x = -ground.width / 2 + player.size[0]
				break
			case player.pos.z > ground.depth / 2 - player.size[2]:
				player.pos.z = ground.depth / 2 - player.size[2]
				break
			case player.pos.z < -ground.depth / 2 + player.size[2]:
				player.pos.z = -ground.depth / 2 + player.size[2]
				break
		}

		player = player
	})

	const pyramid = generatePyramid(1, 0.3, 0.3)

	$: collider?.setTranslation(new Vector3(player.pos.x, player.pos.y, player.pos.z))
	$: collider?.setRotation(new Vector4(1))

	function handleHit() {
		// turn the player color white twice in a row when hit for 50ms each then return to original color
		player.color = '#ccc'
		setTimeout(() => {
			player.color = '#5D9FFF'
		}, 100)
		setTimeout(() => {
			player.color = '#ccc'
		}, 200)
		setTimeout(() => {
			player.color = '#5D9FFF'
		}, 300)
	}
</script>

<!-- <T.PerspectiveCamera position={cameraPos} makeDefault fov={5} near={0.1} far={1000000}>
	</T.PerspectiveCamera> -->

<!-- <Debug /> -->

<T.PerspectiveCamera
	makeDefault
	position={[0, 100, 150]}
	fov={5}
	zoom={0.5}
	near={0.1}
	far={1000000}
	on:create={({ ref }) => {
		ref.lookAt(0, 1, 0)
	}}
>
	<OrbitControls maxPolarAngle={85 * DEG2RAD} minPolarAngle={20 * DEG2RAD} />
</T.PerspectiveCamera>
<T.DirectionalLight
	position={[10, 20, 10]}
	castShadow
	shadow.camera.left={-25}
	shadow.camera.right={25}
	shadow.camera.top={25}
	shadow.camera.bottom={-25}
/>

<T.AmbientLight intensity={0.5} />

<!-- PLAYER -->
<RigidBody type="dynamic">
	<T.Mesh position={[player.pos.x, player.pos.y, player.pos.z]} castShadow>
		<T.BoxGeometry args={[1, 1, 1]} />
		<T.MeshStandardMaterial color={player.color} />
		<Attractor range={30} {strength} />
	</T.Mesh>
</RigidBody>

<Collider
	shape={'cuboid'}
	args={[0.5, 0.5, 0.5]}
	contactForceEventThreshold={30}
	restitution={0.4}
	friction={1}
	bind:collider
	on:contact={throttle(handleHit, 500)}
/>

<!-- PYRAMID -->
{#each pyramid.stones as [x, y, z], i}
	<T.Group position={[x, y, z]}>
		<RigidBody type="dynamic">
			<Collider
				contactForceEventThreshold={30}
				restitution={0.4}
				friction={1}
				shape={'cuboid'}
				args={[pyramid.stoneLength, pyramid.stoneHeight, pyramid.stoneLength]}
			/>
			<T.Mesh castShadow receiveShadow>
				<T.BoxGeometry
					args={[pyramid.stoneLength * 2, pyramid.stoneHeight * 2, pyramid.stoneLength * 2]}
				/>
				<T.MeshStandardMaterial color="red" />
			</T.Mesh>
		</RigidBody>
	</T.Group>
{/each}

<Menu />

<!-- GROUND -->
<T.Group>
	<AutoColliders shape={'cuboid'} friction={0.4}>
		<T.Mesh position={[0, -1, 0]} receiveShadow>
			<T.BoxGeometry args={[ground.width, 1, ground.depth]} />
			<T.MeshStandardMaterial color="#777" />
		</T.Mesh>
	</AutoColliders>
</T.Group>

<!-- WALLS -->
<T.Group>
	<AutoColliders shape={'cuboid'} friction={0}>
		<T.Mesh position={[0, 0, -(ground.width + 1) / 2]} receiveShadow>
			<T.BoxGeometry args={[ground.width + 2, 2, 1]} />
			<T.MeshStandardMaterial color="#888" />
		</T.Mesh>
		<T.Mesh position={[0, 0, (ground.width + 1) / 2]} receiveShadow>
			<T.BoxGeometry args={[ground.width + 2, 2, 1]} />
			<T.MeshStandardMaterial color="#888" />
		</T.Mesh>
		<T.Mesh position={[-(ground.width + 1) / 2, 0, 0]} receiveShadow>
			<T.BoxGeometry args={[1, 2, ground.width + 2]} />
			<T.MeshStandardMaterial color="#888" />
		</T.Mesh>
		<T.Mesh position={[(ground.width + 1) / 2, 0, 0]} receiveShadow>
			<T.BoxGeometry args={[1, 2, ground.width + 2]} />
			<T.MeshStandardMaterial color="#888" />
		</T.Mesh>
	</AutoColliders>
</T.Group>

<!-- DETECTOR -->
<!-- <RigidBody type="Static">
	<Collider sensor shape={'cuboid'} args={[1, 1, 1]} />
</RigidBody> -->

<!-- <Gizmo horizontalPlacement="left" paddingX={20} paddingY={20} /> -->

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />
