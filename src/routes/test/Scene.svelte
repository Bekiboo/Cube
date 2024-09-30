<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'
	import { DEG2RAD } from 'three/src/math/MathUtils.js'
	import { useRapier } from '@threlte/rapier'
	import RAPIER from '@dimforge/rapier3d-compat'

	const { world } = useRapier()

	// Create the ground
	let groundColliderDesc = RAPIER.ColliderDesc.cuboid(10.0, 0.1, 10.0)
	world.createCollider(groundColliderDesc)

	// Create a dynamic rigid-body.
	let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(0.0, 1.0, 0.0)
	let rigidBody = world.createRigidBody(rigidBodyDesc)

	// Create a cuboid collider attached to the dynamic rigidBody.
	let colliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5)
	let collider = world.createCollider(colliderDesc, rigidBody)

	// Game loop. Replace by your own game loop system.
	let gameLoop = () => {
		// Step the simulation forward.
		world.step()

		// Get and print the rigid-body's position.
		let position = rigidBody.translation()
		console.log('Rigid-body position: ', position.x, position.y)

		setTimeout(gameLoop, 16)
	}

	gameLoop()
</script>

<!-- <Debug /> -->
<!-- <T.GridHelper args={[50]} position.y={0.01} /> -->

<T.PerspectiveCamera
	makeDefault
	position={[0, 100, 150]}
	fov={5}
	zoom={0.5}
	near={0.1}
	far={1000}
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

<!-- <T.Group position={[0, 0, 0]}>
	<T.Mesh position={[0, 0, 0]} receiveShadow>
		<T.BoxGeometry args={[1, 1, 1]} />
		<T.MeshStandardMaterial color="red" />
	</T.Mesh>
</T.Group> -->
