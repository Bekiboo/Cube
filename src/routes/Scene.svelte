<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { OrbitControls, AudioListener, Audio } from '@threlte/extras'
	import { DEG2RAD } from 'three/src/math/MathUtils.js'
	import Menu from './Menu.svelte'
	import PlayerComp from './PlayerComp.svelte'
	import EnemyComp from './EnemyComp.svelte'
	import Board from './Board.svelte'
	import { Game } from './Game'
	import { Debug } from '@threlte/rapier'

	let ground = {
		width: 35,
		depth: 35,
		height: 35
	}
	let game = new Game()

	useTask(() => {
		game.update()

		game = game
	})
</script>

<!-- <Debug /> -->
<!-- <T.GridHelper args={[50]} position.y={0.01} /> -->

<!-- {#if game.state === 'Playing'}
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
		<AudioListener />
	</T.PerspectiveCamera>
	<Audio autostart loop refDistance={10} volume={100} src={'/test.mp3'} />
{:else} -->
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
<!-- {/if} -->

<T.DirectionalLight
	position={[10, 20, 10]}
	castShadow
	shadow.camera.left={-25}
	shadow.camera.right={25}
	shadow.camera.top={25}
	shadow.camera.bottom={-25}
/>

<T.AmbientLight intensity={0.5} />

{#if game.player}
	<PlayerComp {ground} player={game.player} />
{/if}

{#each game.enemies as enemy}
	<EnemyComp {enemy} />
{/each}

<Menu {game} />

<Board {ground} />
