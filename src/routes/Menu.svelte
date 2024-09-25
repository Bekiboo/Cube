<script lang="ts">
	import { HTML } from '@threlte/extras'
	import { blur } from 'svelte/transition'
</script>

<HTML transform position.y={3} pointerEvents={'none'}>
	{#key open}
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
	{/key}
</HTML>

<style>
	.door {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 2rem;
		color: white;
		background: black;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		transition: 0.5s;
	}

	.door.closed {
		background: red;
	}

	.door.open {
		background: green;
	}
</style>
