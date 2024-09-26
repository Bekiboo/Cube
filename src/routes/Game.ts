import { Vector3 } from 'three'
import { Player } from './Player'
import { Enemy } from './Enemy'

const getId = () => {
	return Math.random().toString(16).slice(2)
}
const getRandomPosition = () => {
	return new Vector3(0.5 - Math.random() * 1, 5 - Math.random() * 1 + 10, 0.5 - Math.random() * 1)
}

export class Game {
	state: 'Menu' | 'Playing' | 'GameOver'
	score: number
	highScore: number
	player: Player
	timeGameStarted: number
	spawningRate: number
	enemies: Enemy[] = []

	constructor() {
		this.state = 'Menu'
		this.score = 0
		this.highScore = 0
		this.player = new Player([0.5, 0.5, 0.5], { x: -5, y: 0.5, z: -5 }, '#5D9FFF')
	}

	startGame() {
		this.state = 'Playing'
		this.score = 0
		this.player.HP = this.player.maxHP
		this.timeGameStarted = Date.now()
	}

	endGame() {
		this.state = 'GameOver'
		this.highScore = Math.max(this.score, this.highScore)
		this.enemies = []
	}

	update() {
		if (this.state === 'Playing') {
			this.spawningRate = 0.01 + (Date.now() - this.timeGameStarted) / 1_000_000
			// spawn enemies
			if (Math.random() < this.spawningRate) {
				this.enemies.push(
					new Enemy(
						[0.5, 5, 0.5],
						new Vector3(Math.random() * 35 - 35 / 2, 10, Math.random() * 35 - 35 / 2),
						'blue'
					)
				)
			}

			if (this.enemies.length > 50) {
				this.enemies.shift()
			}

			if (this.player.HP <= 0) {
				this.endGame()
			}
		}
	}

	increaseScore() {
		this.score++
	}

	decreaseScore() {
		this.score--
	}
}
