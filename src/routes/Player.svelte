<script lang="ts">
	import { RigidBody, Collider } from '@threlte/rapier'
	import { T, useTask } from '@threlte/core'
	import { Attractor } from '@threlte/rapier'
	import { throttle } from './utils'
	import { Vector3, Vector4 } from 'three'
	import { Player } from './Player'
	import { handleKeysDown, handleKeysUp } from './keyboardInputHandler'
	import { player } from '$lib/stores'

	export let ground = {
		width: 35,
		depth: 35
	}

	let strength = 0.0625
	let keysPressed = []

	const handleKeyDown = (e) => (keysPressed = handleKeysDown(e, keysPressed))
	const handleKeyUp = (e) => (keysPressed = handleKeysUp(e, keysPressed))

	$player = new Player([0.5, 0.5, 0.5], { x: -5, y: 0, z: -5 }, '#5D9FFF')

	let collider

	useTask((delta) => {
		if (keysPressed.includes('forward')) $player.pos.z -= 10 * delta
		if (keysPressed.includes('backward')) $player.pos.z += 10 * delta
		if (keysPressed.includes('left')) $player.pos.x -= 10 * delta
		if (keysPressed.includes('right')) $player.pos.x += 10 * delta

		switch (true) {
			case $player.pos.x > ground.width / 2 - $player.size[0]:
				$player.pos.x = ground.width / 2 - $player.size[0]
				break
			case $player.pos.x < -ground.width / 2 + $player.size[0]:
				$player.pos.x = -ground.width / 2 + $player.size[0]
				break
			case $player.pos.z > ground.depth / 2 - $player.size[2]:
				$player.pos.z = ground.depth / 2 - $player.size[2]
				break
			case $player.pos.z < -ground.depth / 2 + $player.size[2]:
				$player.pos.z = -ground.depth / 2 + $player.size[2]
				break
		}
	})

	$: collider?.setTranslation(new Vector3($player.pos.x, $player.pos.y, $player.pos.z))
	$: collider?.setRotation(new Vector4(1))

	function handleHit() {
		// turn the $player color white twice in a row when hit for 50ms each then return to original color
		$player.color = '#ccc'
		setTimeout(() => {
			$player.color = '#5D9FFF'
		}, 100)
		setTimeout(() => {
			$player.color = '#ccc'
		}, 200)
		setTimeout(() => {
			$player.color = '#5D9FFF'
		}, 300)

		$player.HP -= 1
	}
</script>

<RigidBody type="dynamic">
	<T.Mesh position={[$player.pos.x, $player.pos.y, $player.pos.z]} castShadow>
		<T.BoxGeometry args={[1, 1, 1]} />
		<T.MeshStandardMaterial color={$player.color} />
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

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />
