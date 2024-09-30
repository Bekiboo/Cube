<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import Menu from './Menu.svelte'
	import PlayerComp from './PlayerComp.svelte'
	import EnemyComp from './EnemyComp.svelte'
	import Board from './Board.svelte'
	import { Game } from './Game'

	let game = new Game()
	let enemies = []

	useTask(() => {
		game.update()
		enemies = game.enemies
		game = game
	})

	function removeEnemy(e) {
		game.removeEnemy(e.detail)
	}
</script>

<T.PerspectiveCamera
	makeDefault
	position={[30, 90, 200]}
	fov={5}
	zoom={0.5}
	near={0.1}
	far={1000}
	on:create={({ ref }) => {
		ref.lookAt(0, 0, 0)
	}}
></T.PerspectiveCamera>

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
	<PlayerComp ground={game.ground} player={game.player} />
{/if}

{#each enemies as enemy}
	{#if !enemy.markedForDeletion}
		<EnemyComp {enemy} />
	{/if}
{/each}

<Board ground={game.ground} on:removeEnemy={removeEnemy} />

<Menu {game} />
