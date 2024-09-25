<script lang="ts">
	import { player } from '$lib/stores'
	import { HTML } from '@threlte/extras'
	import { blur } from 'svelte/transition'
</script>

<HTML transform position.y={3} position.z={-17.5} pointerEvents={'none'}>
	<!-- HP -->
	<div class="w-96 h-16 bg-black border-white border-8">
		<div class="bg-red-500 h-full" style="width: {($player.HP / 100) * 100}%;"></div>
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
