<script>
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
	import { World } from '@threlte/rapier'
</script>

<main class="text-cube">
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
		position: absolute;
	}

	:global(body) {
		margin: 0;
		overflow: hidden;
	}
</style>
