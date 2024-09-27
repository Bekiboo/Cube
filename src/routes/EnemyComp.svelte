<script lang="ts">
	import { T } from '@threlte/core'
	import { Collider, RigidBody } from '@threlte/rapier'
	import type { Enemy } from './Enemy'

	export let enemy: Enemy

	let { pos: position } = enemy
</script>

<T.Group position={position?.toArray()}>
	<RigidBody
		type="dynamic"
		on:contact={(e) => {
			console.log(e.targetCollider.handle)
		}}
	>
		<Collider
			contactForceEventThreshold={30}
			restitution={0.4}
			friction={1}
			shape={'cuboid'}
			args={[0.25, 0.25, 0.25]}
		/>
		<T.Mesh castShadow receiveShadow>
			<T.BoxGeometry args={[0.25 * 2, 0.25 * 2, 0.25 * 2]} />
			<T.MeshStandardMaterial color="red" />
		</T.Mesh>
	</RigidBody>
</T.Group>

<!-- PYRAMID -->
<!-- {#each pyramid.stones as [x, y, z], i}
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
{/each} -->
