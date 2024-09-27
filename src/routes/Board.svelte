<script lang="ts">
	import { T } from '@threlte/core'
	import { AutoColliders, Collider } from '@threlte/rapier'

	export let ground = {
		width: 35,
		depth: 35,
		height: 35
	}

	function removeEnemy() {
		console.log('Enemy removed')
	}
</script>

<!-- GROUND -->
<T.Group>
	<AutoColliders shape={'cuboid'} friction={0.4}>
		<T.Mesh position={[0, -ground.height / 2, 0]} receiveShadow>
			<T.BoxGeometry args={[ground.width + 2, ground.height, ground.depth + 2]} />
			<T.MeshStandardMaterial color="#777" />
		</T.Mesh>
	</AutoColliders>
</T.Group>

<!-- WALLS -->
<T.Group>
	<AutoColliders shape={'cuboid'} friction={0}>
		<T.Mesh position={[0, 0.5, -(ground.width + 1) / 2]} receiveShadow>
			<T.BoxGeometry args={[ground.width + 2, 1, 1]} />
			<T.MeshStandardMaterial color="#888" />
		</T.Mesh>
		<T.Mesh position={[0, 0.5, (ground.width + 1) / 2]} receiveShadow>
			<T.BoxGeometry args={[ground.width + 2, 1, 1]} />
			<T.MeshStandardMaterial color="#888" />
		</T.Mesh>
		<T.Mesh position={[-(ground.depth + 1) / 2, 0.5, 0]} receiveShadow>
			<T.BoxGeometry args={[1, 1, ground.depth + 2]} />
			<T.MeshStandardMaterial color="#888" />
		</T.Mesh>
		<T.Mesh position={[(ground.depth + 1) / 2, 0.5, 0]} receiveShadow>
			<T.BoxGeometry args={[1, 1, ground.depth + 2]} />
			<T.MeshStandardMaterial color="#888" />
		</T.Mesh>
	</AutoColliders>
</T.Group>

<!-- SENSOR -->
<T.Group position={[0, -2, 0]}>
	<Collider on:sensorenter={removeEnemy} sensor shape={'cuboid'} args={[100, 1, 100]} />
</T.Group>
