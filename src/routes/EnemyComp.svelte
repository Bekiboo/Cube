<script lang="ts">
	import { T } from '@threlte/core'
	import { Collider, RigidBody, type ContactEvent } from '@threlte/rapier'
	import type { Vector3 } from 'three'
	import { PositionalAudio } from '@threlte/extras'

	export let position: Vector3 | undefined = undefined

	import { clamp } from 'three/src/math/MathUtils.js'

	const audios: {
		threshold: number
		volume: number
		stop: (() => any) | undefined
		play: ((...args: any[]) => any) | undefined
		source: string
	}[] = new Array(9).fill(0).map((_, i) => {
		return {
			threshold: i / 10,
			play: undefined,
			stop: undefined,
			volume: (i + 2) / 10,
			source: `/bounce.wav`
		}
	})
	const fireSound = (e: ContactEvent) => {
		const volume = clamp((e.totalForceMagnitude - 30) / 1100, 0.1, 1)
		const audio = audios.find((a) => a.volume >= volume)
		audio?.stop?.()
		audio?.play?.()
	}
</script>

<T.Group position={position?.toArray()}>
	<!-- on:contact={fireSound} -->
	<RigidBody type="dynamic" on:contact={fireSound}>
		{#each audios as audio}
			<PositionalAudio
				autoplay={false}
				detune={600 - Math.random() * 1200}
				bind:stop={audio.stop}
				bind:play={audio.play}
				src={audio.source}
				volume={audio.volume}
			/>
		{/each}
		<Collider
			contactForceEventThreshold={30}
			restitution={0.4}
			friction={1}
			shape={'cuboid'}
			args={[0.25, 0.25, 0.25]}
		/>
		<T.Mesh castShadow receiveShadow>
			<T.BoxGeometry args={[0.25 * 2, 0.25 * 2, 0.25 * 2]} />
			<T.MeshStandardMaterial color="red" />
		</T.Mesh>
	</RigidBody>
</T.Group>

<!-- PYRAMID -->
<!-- {#each pyramid.stones as [x, y, z], i}
	<T.Group position={[x, y, z]}>
		<RigidBody type="dynamic">
			<Collider
				contactForceEventThreshold={30}
				restitution={0.4}
				friction={1}
				shape={'cuboid'}
				args={[pyramid.stoneLength, pyramid.stoneHeight, pyramid.stoneLength]}
			/>
			<T.Mesh castShadow receiveShadow>
				<T.BoxGeometry
					args={[pyramid.stoneLength * 2, pyramid.stoneHeight * 2, pyramid.stoneLength * 2]}
				/>
				<T.MeshStandardMaterial color="red" />
			</T.Mesh>
		</RigidBody>
	</T.Group>
{/each} -->
