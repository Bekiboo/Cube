<script lang="ts">
	import { player } from '$lib/stores'
	import { HTML } from '@threlte/extras'
	import { blur } from 'svelte/transition'
</script>

<HTML transform position.y={3} position.z={-17.5} pointerEvents={'none'}>
	<!-- HP -->
	<div class="border w-40 h-8 bg-black border-white">
		<span></span>
	</div>
	<!-- {#key open}
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
	{/key} -->
</HTML>

<style>
</style>
