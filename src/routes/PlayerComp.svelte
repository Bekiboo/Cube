<script lang="ts">
	import { RigidBody, Collider } from '@threlte/rapier'
	import { T, useTask } from '@threlte/core'
	import { Attractor } from '@threlte/rapier'
	import { throttle } from './utils'
	import { Vector3, Vector4 } from 'three'
	import { Player } from './Player'
	import { handleKeysDown, handleKeysUp } from './keyboardInputHandler'

	export let ground = 35

	export let player: Player

	let strength = 0.25
	let keysPressed = []

	const handleKeyDown = (e) => (keysPressed = handleKeysDown(e, keysPressed))
	const handleKeyUp = (e) => (keysPressed = handleKeysUp(e, keysPressed))

	let collider

	useTask((delta) => {
		if (keysPressed.includes('forward')) player.pos.z -= 10 * delta
		if (keysPressed.includes('backward')) player.pos.z += 10 * delta
		if (keysPressed.includes('left')) player.pos.x -= 10 * delta
		if (keysPressed.includes('right')) player.pos.x += 10 * delta

		// right wall
		if (player.pos.x > ground / 2 - player.size) player.pos.x = ground / 2 - player.size

		// left wall
		if (player.pos.x < -ground / 2 + player.size) player.pos.x = -ground / 2 + player.size

		// back wall
		if (player.pos.z > ground / 2 - player.size) player.pos.z = ground / 2 - player.size

		// front wall
		if (player.pos.z < -ground / 2 + player.size) player.pos.z = -ground / 2 + player.size
	})

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

		player.HP -= 1
	}
</script>

<RigidBody type="dynamic">
	<T.Mesh position={[player.pos.x, player.pos.y, player.pos.z]} castShadow>
		<T.BoxGeometry args={[player.size * 2, player.size * 2, player.size * 2]} />
		<T.MeshStandardMaterial color={player.color} />
		<Attractor range={40} gravityType="linear" {strength} />
	</T.Mesh>
</RigidBody>

<Collider
	shape={'cuboid'}
	args={[player.size, player.size, player.size]}
	contactForceEventThreshold={30}
	restitution={0.4}
	friction={1}
	bind:collider
	on:contact={throttle(handleHit, 500)}
/>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />
