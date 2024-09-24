<script>
	import { T, useTask } from '@threlte/core';
	import { Gizmo, OrbitControls, HTML } from '@threlte/extras';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import { handleKeysDown, handleKeysUp } from './keyboardInputHandler';
	import { generatePyramid } from './pyramidGenerator';
	import {
		AutoColliders,
		Collider,
		RigidBody,
		BasicPlayerController,
		Attractor,
		Debug
	} from '@threlte/rapier';
	import { MeshStandardMaterial, CylinderGeometry } from 'three';
	import { onMount } from 'svelte';

	import { blur } from 'svelte/transition';

	let playerPos = [-5, 2, -5];

	let keysPressed = [];

	let strength = 0.125;

	const handleKeyDown = (e) => (keysPressed = handleKeysDown(e, keysPressed));
	const handleKeyUp = (e) => (keysPressed = handleKeysUp(e, keysPressed));

	let player = {
		pos: { x: -5, y: 0, z: -5 }
	};

	let playerCollider;
	onMount(() => {});
	console.log('🚀 ~ playerCollider:', playerCollider);

	useTask((delta) => {
		// if (keysPressed.includes('forward')) playerCollider.setTranslation({}) -= 8 * delta;
		// if (keysPressed.includes('backward')) playerCollider.setTranslation({}) += 8 * delta;
		// if (keysPressed.includes('left')) playerCollider.setTranslation({}) -= 8 * delta;
		// if (keysPressed.includes('right')) playerCollider.setTranslation({}) += 8 * delta;
		// if (keysPressed.includes('forward')) player.pos.z -= 8 * delta;
		// if (keysPressed.includes('backward')) player.pos.z += 8 * delta;
		// if (keysPressed.includes('left')) player.pos.x -= 8 * delta;
		// if (keysPressed.includes('right')) player.pos.x += 8 * delta;

		player = player;
	});

	const pyramid = generatePyramid(1, 0.5, 0.5);

	let open = true;
</script>

<!-- <T.PerspectiveCamera position={cameraPos} makeDefault fov={5} near={0.1} far={1000000}>
	</T.PerspectiveCamera> -->

<T.PerspectiveCamera
	makeDefault
	position={[0, 100, 150]}
	fov={5}
	zoom={0.5}
	near={0.1}
	far={1000000}
	on:create={({ ref }) => {
		ref.lookAt(0, 1, 0);
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
<!-- <BasicPlayerController
	position={playerPos}
	speed={8}
	radius={0.3}
	height={1.8}
	jumpStrength={4}
	groundCollisionGroups={[15]}
	playerCollisionGroups={[0]}
>
	<T.Mesh
		position.y={0.9}
		receiveShadow
		castShadow
		geometry={new CylinderGeometry(0.3, 0.3, 1.8, 6)}
		material={new MeshStandardMaterial()}
	/>
	<Attractor range={30} {strength} />
</BasicPlayerController> -->

<RigidBody type="Dynamic">
	<T.Mesh position={[player.pos.x, player.pos.y, player.pos.z]} castShadow>
		<Collider
			shape={'cuboid'}
			args={[1, 1, 1]}
			contactForceEventThreshold={30}
			restitution={0.4}
			friction={1}
		/>
		<T.BoxGeometry args={[1, 1, 1]} />
		<T.MeshStandardMaterial color={'red'} />
		<!-- <Attractor range={200} strength={0.125} /> -->
	</T.Mesh>
</RigidBody>

<Collider
	shape={'cuboid'}
	args={[1, 1, 1]}
	contactForceEventThreshold={30}
	restitution={0.4}
	friction={1}
/>

<Debug />

<!-- TEST -->
{#each pyramid.stones as [x, y, z], i}
	<T.Group position={[x, y, z]}>
		<RigidBody type="Dynamic">
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

<HTML transform position.y={3} pointerEvents={'none'}>
	{#key open}
		<small
			in:blur={{
				amount: 15,
				duration: 300
			}}
			out:blur={{
				amount: 15,
				duration: 300
			}}
			class="door"
			class:closed={!open}
			class:open
		>
			{open ? 'UNLOCKED' : 'LOCKED'}
		</small>
	{/key}
</HTML>

<!-- GROUND -->
<T.Group>
	<AutoColliders shape={'cuboid'} friction={0.4}>
		<T.Mesh position={[0, -1, 0]} receiveShadow>
			<T.BoxGeometry args={[40, 1, 40]} />
			<T.MeshStandardMaterial color="#777" />
		</T.Mesh>
	</AutoColliders>
</T.Group>

<!-- WALLS -->
<T.Group>
	<AutoColliders shape={'cuboid'} friction={0}>
		<T.Mesh position={[0, 0, -20]} receiveShadow>
			<T.BoxGeometry args={[41, 2, 1]} />
			<T.MeshStandardMaterial color="#888" />
		</T.Mesh>
		<T.Mesh position={[0, 0, 20]} receiveShadow>
			<T.BoxGeometry args={[41, 2, 1]} />
			<T.MeshStandardMaterial color="#888" />
		</T.Mesh>
		<T.Mesh position={[-20, 0, 0]} receiveShadow>
			<T.BoxGeometry args={[1, 2, 41]} />
			<T.MeshStandardMaterial color="#888" />
		</T.Mesh>
		<T.Mesh position={[20, 0, 0]} receiveShadow>
			<T.BoxGeometry args={[1, 2, 41]} />
			<T.MeshStandardMaterial color="#888" />
		</T.Mesh>
	</AutoColliders>
</T.Group>

<!-- DETECTOR -->
<!-- <RigidBody type="Static">
	<Collider sensor shape={'cuboid'} args={[1, 1, 1]} />
</RigidBody> -->

<Gizmo horizontalPlacement="left" paddingX={20} paddingY={20} />

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />

<style>
	.door {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 2rem;
		color: white;
		background: black;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		transition: 0.5s;
	}

	.door.closed {
		background: red;
	}

	.door.open {
		background: green;
	}
</style>
