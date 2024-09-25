<script lang="ts">
	import { T } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'
	import { DEG2RAD } from 'three/src/math/MathUtils.js'
	import { generatePyramid } from './pyramidGenerator'
	import { Collider, RigidBody, Debug } from '@threlte/rapier'
	import Menu from './Menu.svelte'
	import Player from './Player.svelte'
	import Board from './Board.svelte'

	let ground = {
		width: 35,
		depth: 35
	}

	const pyramid = generatePyramid(2, 0.3, 0.3)
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
<Player {ground} />

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

<Board {ground} />

<!-- DETECTOR -->
<!-- <RigidBody type="Static">
	<Collider sensor shape={'cuboid'} args={[1, 1, 1]} />
</RigidBody> -->

<!-- <Gizmo horizontalPlacement="left" paddingX={20} paddingY={20} /> -->
