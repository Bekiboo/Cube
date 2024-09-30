<script lang="ts">
	import { T } from '@threlte/core'
	import { AutoColliders, Collider } from '@threlte/rapier'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let ground = 20

	function removeEnemy(e) {
		dispatch('removeEnemy', e.targetRigidBody.userData.id)
	}
</script>

<!-- GROUND -->
<T.Group>
	<AutoColliders shape={'cuboid'} friction={0.4}>
		<T.Mesh position={[0, -ground / 2, 0]} receiveShadow>
			<T.BoxGeometry args={[ground + 2, ground, ground + 2]} />
			<T.MeshStandardMaterial color="#777" />
		</T.Mesh>
	</AutoColliders>
</T.Group>

<!-- WALLS -->
<T.Group>
	<AutoColliders shape={'cuboid'} friction={0}>
		<T.Mesh position={[0, 0.5, -(ground + 1) / 2]} receiveShadow>
			<T.BoxGeometry args={[ground + 2, 1, 1]} />
			<T.MeshStandardMaterial color="#888" />
		</T.Mesh>
		<T.Mesh position={[0, 0.5, (ground + 1) / 2]} receiveShadow>
			<T.BoxGeometry args={[ground + 2, 1, 1]} />
			<T.MeshStandardMaterial color="#888" />
		</T.Mesh>
		<T.Mesh position={[-(ground + 1) / 2, 0.5, 0]} receiveShadow>
			<T.BoxGeometry args={[1, 1, ground + 2]} />
			<T.MeshStandardMaterial color="#888" />
		</T.Mesh>
		<T.Mesh position={[(ground + 1) / 2, 0.5, 0]} receiveShadow>
			<T.BoxGeometry args={[1, 1, ground + 2]} />
			<T.MeshStandardMaterial color="#888" />
		</T.Mesh>
	</AutoColliders>
</T.Group>

<!-- SENSOR -->
<T.Group position={[0, -2, 0]}>
	<Collider on:sensorenter={removeEnemy} sensor shape={'cuboid'} args={[100, 1, 100]} />
</T.Group>
