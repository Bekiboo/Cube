<script lang="ts">
	import { T } from '@threlte/core'
	import { Collider, RigidBody } from '@threlte/rapier'
	import type { Enemy } from './Enemy'

	export let enemy: Enemy

	let { pos: position } = enemy
</script>

<T.Group position={[position.x, position.y, position.z]}>
	<RigidBody type="dynamic" userData={enemy}>
		<Collider
			contactForceEventThreshold={30}
			restitution={0.4}
			friction={1}
			shape={'cuboid'}
			args={enemy.size}
		/>
		<T.Mesh castShadow receiveShadow>
			<T.BoxGeometry args={[enemy.size[0] * 2, enemy.size[1] * 2, enemy.size[2] * 2]} />
			<T.MeshStandardMaterial color={enemy.markedForDeletion ? 'gray' : enemy.color} />
		</T.Mesh>
	</RigidBody>
</T.Group>
