<script>
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import { World } from '@threlte/rapier';
</script>

<main>
	<Canvas>
		<World>
			<Scene />
		</World>
	</Canvas>
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
	}

	:global(body) {
		margin: 0;
		overflow: hidden;
	}
</style>
