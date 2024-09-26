import { writable, type Writable } from 'svelte/store'
import type { Player } from '../routes/Player'
import type { Game } from '../routes/Game'
import type { Enemy } from '../routes/Enemy'

export const game: Writable<Game> = writable(null)
export const player: Writable<Player> = writable(null)
export const enemies: Writable<Enemy[]> = writable([])
