<script lang="ts">
	import { T } from '@threlte/core'
	import { Collider, RigidBody } from '@threlte/rapier'
	import type { Enemy } from './Enemy'

	export let enemy: Enemy

	let { pos: position } = enemy
</script>

{#if !enemy.markedForDeletion}
	<T.Group position={[position.x, position.y, position.z]}>
		<RigidBody type="dynamic" userData={enemy}>
			<Collider
				contactForceEventThreshold={30}
				restitution={0.4}
				friction={1}
				shape={'cuboid'}
				args={[0.25, 0.25, 0.25]}
			/>
			<T.Mesh castShadow receiveShadow>
				<T.BoxGeometry args={[0.25 * 2, 0.25 * 2, 0.25 * 2]} />
				<T.MeshStandardMaterial color={enemy.markedForDeletion ? 'gray' : 'red'} />
			</T.Mesh>
		</RigidBody>
	</T.Group>
{/if}
