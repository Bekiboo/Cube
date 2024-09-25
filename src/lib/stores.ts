import { writable, type Writable } from 'svelte/store'
import type { Player } from '../routes/Player'

export const player: Writable<Player> = writable(null)
