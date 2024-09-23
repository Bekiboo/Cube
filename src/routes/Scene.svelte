<script>
	import { T, useTask } from '@threlte/core';
	import { Gizmo, OrbitControls } from '@threlte/extras';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import { handleKeysDown, handleKeysUp } from './keyboardInputHandler';
	import {
		AutoColliders,
		Collider,
		RigidBody,
		BasicPlayerController,
		Attractor
	} from '@threlte/rapier';
	import { CapsuleGeometry, MeshStandardMaterial } from 'three';

	let cameraPos = [50, 100, 200];
	let playerPos = [-5, 2, -5];

	let keysPressed = [];

	let strength = 0.25;

	// const handleKeyDown = (e) => (keysPressed = handleKeysDown(e, keysPressed));
	// const handleKeyUp = (e) => (keysPressed = handleKeysUp(e, keysPressed));

	async function handleKeyDown(e) {
		e.code === 'Space' && (strength = -2);
	}

	async function handleKeyUp(e) {
		e.code === 'Space' && (strength = 0.25);
	}

	useTask((delta) => {
		if (keysPressed.includes('forward')) playerPos[2] -= 5 * delta;
		if (keysPressed.includes('backward')) playerPos[2] += 5 * delta;
		if (keysPressed.includes('left')) playerPos[0] -= 5 * delta;
		if (keysPressed.includes('right')) playerPos[0] += 5 * delta;
	});

	const pyramid = [];
	const PYRAMID_HEIGHT = 6;
	const STONE_LENGTH = 0.5;
	const STONE_HEIGHT = 0.1;

	for (let i = 0; i < PYRAMID_HEIGHT; i++) {
		for (let j = 0; j < PYRAMID_HEIGHT - i; j++) {
			for (let k = 0; k < PYRAMID_HEIGHT - i; k++) {
				pyramid.push([
					j * STONE_LENGTH * 2 + STONE_LENGTH * i,
					i * STONE_HEIGHT * 2 + STONE_HEIGHT,
					k * STONE_LENGTH * 2 + STONE_LENGTH * i
				]);
			}
		}
	}

	console.log(pyramid);
</script>

<!-- <T.PerspectiveCamera position={cameraPos} makeDefault fov={5} near={0.1} far={1000000}>
	</T.PerspectiveCamera> -->

<T.PerspectiveCamera
	makeDefault
	position={[150, 100, 0]}
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
<BasicPlayerController
	position={playerPos}
	speed={10}
	radius={0.3}
	height={1.8}
	jumpStrength={8}
	groundCollisionGroups={[15]}
	playerCollisionGroups={[0]}
>
	<T.Mesh
		position.y={0.9}
		receiveShadow
		castShadow
		geometry={new CapsuleGeometry(0.3, 1.8 - 0.3 * 2)}
		material={new MeshStandardMaterial()}
	/>
	<Attractor range={30} {strength} />
</BasicPlayerController>

<!-- TEST -->
{#each pyramid as [x, y, z], i}
	<T.Group position={[x, y, z]}>
		<RigidBody type="Dynamic">
			<Collider
				contactForceEventThreshold={30}
				restitution={0.4}
				friction={0.4}
				shape={'ball'}
				args={[STONE_LENGTH, STONE_HEIGHT, STONE_LENGTH]}
			/>
			<T.Mesh castShadow receiveShadow>
				<!-- <T.BoxGeometry args={[STONE_LENGTH * 2, STONE_HEIGHT * 2, STONE_LENGTH * 2]} /> -->
				<T.SphereGeometry args={[STONE_LENGTH]} />
				<T.MeshStandardMaterial color="red" />
			</T.Mesh>
		</RigidBody>
	</T.Group>
{/each}

<!-- GROUND -->
<T.Group>
	<AutoColliders shape={'cuboid'}>
		<T.Mesh position={[0, -1, 0]} receiveShadow>
			<T.BoxGeometry args={[40, 2, 40]} />
			<T.MeshStandardMaterial color="#777" />
		</T.Mesh>
	</AutoColliders>
</T.Group>

<!-- <T.GridHelper args={[100, 100]} /> -->

<Gizmo horizontalPlacement="left" paddingX={20} paddingY={20} />

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />
