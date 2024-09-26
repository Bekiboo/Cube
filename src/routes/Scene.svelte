<script lang="ts">
	import { T } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'
	import { DEG2RAD } from 'three/src/math/MathUtils.js'
	import Menu from './Menu.svelte'
	import PlayerComp from './PlayerComp.svelte'
	import EnemyComp from './EnemyComp.svelte'
	import Board from './Board.svelte'
	import { player } from '$lib/stores'
	import { Game } from './Game'
	import { useTask } from '@threlte/core'

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
<T.DirectionalLight
	position={[10, 20, 10]}
	castShadow
	shadow.camera.left={-25}
	shadow.camera.right={25}
	shadow.camera.top={25}
	shadow.camera.bottom={-25}
/>

<T.AmbientLight intensity={0.5} />

{#if $player}
	<PlayerComp {ground} />
{/if}

{#each game.enemies as enemy}
	<EnemyComp position={enemy.pos} />
{/each}

<Menu {game} />

<Board {ground} />
