import { game, player } from '$lib/stores'
import { Player } from './Player'

export class Game {
	state: 'Menu' | 'Playing' | 'GameOver'
	score: number
	highScore: number
	player: Player

	constructor() {
		this.state = 'Menu'
		this.score = 0
		this.highScore = 0
		// this.player = new Player([0.5, 0.5, 0.5], { x: -5, y: 0.5, z: -5 }, '#5D9FFF')
	}

	startGame() {
		this.state = 'Playing'
		this.score = 0
		this.player = new Player([0.5, 0.5, 0.5], { x: -5, y: 0.5, z: -5 }, '#5D9FFF')
		player.set(this.player)
		game.set(this)
	}

	endGame() {
		this.state = 'GameOver'
		this.highScore = Math.max(this.score, this.highScore)
	}

	increaseScore() {
		this.score++
	}

	decreaseScore() {
		this.score--
	}
}
