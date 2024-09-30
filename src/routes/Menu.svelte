<script lang="ts">
	import { HTML } from '@threlte/extras'
	import { fade } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'
	import type { Game } from './Game'

	export let ground = -17.5

	export let game: Game
</script>

<HTML transform position.y={3} position.z={-ground / 2} class="bg-red-500">
	{#if game.state === 'Menu'}
		<div class="flex flex-col" in:fade={{ duration: 500, delay: 500, easing: quintOut }}>
			<h1 class="font-black text-red-500 text-9xl">CUBE</h1>
			<button
				class="p-2 mx-auto mt-4 text-4xl text-white bg-blue-500 hover:bg-blue-400"
				on:click={() => game.startGame()}>Start</button
			>
		</div>
	{/if}
	{#if game.state === 'GameOver'}
		<div class="text-4xl text-center text-white">Score: {game.score}</div>
		<div
			class="flex flex-col justify-center p-4"
			in:fade={{ duration: 500, delay: 500, easing: quintOut }}
		>
			<h1 class="text-2xl text-center text-red-500">Game Over</h1>
			<button
				class="p-2 mt-4 text-2xl text-white bg-blue-500 rounded-lg"
				on:click={() => game.startGame()}>Restart</button
			>
		</div>
	{/if}

	{#if game.state === 'Playing'}
		<div class="text-4xl text-center text-white">Score: {game.score}</div>
		<div
			in:fade={{ duration: 150, delay: 150, easing: quintOut }}
			class="h-16 duration-150 bg-black border-8 border-white w-96"
		>
			<div
				class="h-full bg-red-500"
				style="width: {(100 / game.player.maxHP) * game.player.HP}%;"
			></div>
		</div>
	{/if}
</HTML>
