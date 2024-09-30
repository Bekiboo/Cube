<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'

	import Menu from './Menu.svelte'
	import PlayerComp from './PlayerComp.svelte'
	import EnemyComp from './EnemyComp.svelte'
	import Board from './Board.svelte'
	import { Game } from './Game'
	import { Debug } from '@threlte/rapier'

	let game = new Game()

	useTask(() => {
		game.update()

		game = game
	})
</script>

<Debug />
<!-- <T.GridHelper args={[50]} position.y={0.01} /> -->

<T.PerspectiveCamera
	makeDefault
	position={[0, 120, 150]}
	fov={5}
	zoom={0.5}
	near={0.1}
	far={1000}
	on:create={({ ref }) => {
		ref.lookAt(0, 10, 0)
	}}
>
	<OrbitControls />
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

<Menu {game} />

{#if game.player}
	<PlayerComp ground={game.ground} player={game.player} />
{/if}

{#each game.enemies as enemy}
	<EnemyComp {enemy} />
{/each}

<Board ground={game.ground} />
