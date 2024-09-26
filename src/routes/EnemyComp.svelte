<script lang="ts" context="module">
	const geometry = new BoxGeometry(0.5, 0.5, 0.5)
	const material = new MeshStandardMaterial()
	export const muted = writable(true)
</script>

<script lang="ts">
	import { T } from '@threlte/core'
	import { Collider, RigidBody, type ContactEvent } from '@threlte/rapier'
	import { writable } from 'svelte/store'
	import type { Vector3 } from 'three'
	import { BoxGeometry, MeshStandardMaterial } from 'three'

	export let position: Vector3 | undefined = undefined
</script>

<T.Group position={position?.toArray()}>
	<!-- on:contact={fireSound} -->
	<RigidBody type="dynamic">
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
