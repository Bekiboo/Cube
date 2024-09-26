<script lang="ts">
	import { player } from '$lib/stores'
	import { spring } from 'svelte/motion'
	import { HTML } from '@threlte/extras'
	import { fade, fly } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'
	import type { Game } from './Game'

	let isPointerDown = false

	let htmlPosZ = -17.5

	export let game: Game
	// let htmlPosZ = spring(0)
	// $: htmlPosZ.set(isPointerDown ? -0.15 : 0, {
	// 	hard: isPointerDown
	// })
</script>

<HTML transform position.y={3} position.z={htmlPosZ} class="bg-red-500">
	{#if game.state === 'Menu'}
		<div class="flex flex-col" in:fade={{ duration: 500, delay: 500, easing: quintOut }}>
			<h1 class="font-black text-red-500 text-9xl">CUBE</h1>
			<button
				class="bg-blue-500 text-4xl mx-auto hover:bg-blue-400 text-white p-2 mt-4"
				on:pointerdown={() => (isPointerDown = true)}
				on:pointerup={() => (isPointerDown = false)}
				on:pointercancel={() => {
					isPointerDown = false
				}}
				on:click={() => game.startGame()}>Start</button
			>
		</div>
	{/if}
	{#if game.state === 'GameOver'}
		<div
			class="flex justify-center items-center w-screen h-screen"
			in:fade={{ duration: 500, delay: 500, easing: quintOut }}
		>
			<div class="bg-white p-4 rounded-lg">
				<h1 class="text-2xl">Game Over</h1>
				<button class="bg-blue-500 text-white p-2 rounded-lg mt-4" on:click={() => game.startGame()}
					>Restart</button
				>
			</div>
		</div>
	{/if}

	{#if game.state === 'Playing'}
		<!-- <div class="bg-red-500 w-screen">
                <div class="text-white left-2 top-2">
                    <div class="flex justify-center w-full">
                        <kbd class="kbd">W</kbd>
                    </div>
                    <div class="flex justify-center w-full">
                        <kbd class="kbd">A</kbd>
                        <kbd class="kbd">S</kbd>
                        <kbd class="kbd">D</kbd>
                    </div>
                    <div class="flex justify-center w-full mt-2">
                        <kbd class="kbd">Space</kbd>
                    </div>
                </div>
            </div> -->
		<div
			in:fade={{ duration: 150, delay: 150, easing: quintOut }}
			class="w-96 h-16 bg-black duration-150 border-white border-8"
		>
			<div class="bg-red-500 h-full" style="width: {(100 / $player.maxHP) * $player.HP}%;"></div>
		</div>
	{/if}
</HTML>

<style>
</style>
