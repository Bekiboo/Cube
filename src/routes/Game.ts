import { Vector3 } from 'three'
import { Player } from './Player'
import { Enemy } from './Enemy'

export class Game {
	state: 'Menu' | 'Playing' | 'GameOver'
	player: Player
	timeGameStarted: number
	spawningRate: number
	enemies: Enemy[] = []
	ground: number
	score: number

	constructor() {
		this.state = 'Menu'
		this.ground = 35
		this.player = new Player(0.5, { x: 0, y: 0 + 0.5, z: 0 }, '#5D9FFF')
		this.score = 0
	}

	startGame() {
		this.state = 'Playing'
		this.score = 0
		this.player.HP = this.player.maxHP
		this.timeGameStarted = Date.now()
		this.spawnEnemy()
	}

	endGame() {
		this.state = 'GameOver'
		this.enemies = []
		this.spawningRate = 0
	}

	update() {
		if (this.state === 'Playing') {
			this.spawningRate = 0.01 + (Date.now() - this.timeGameStarted) / 1_000_000

			// spawn enemies
			if (Math.random() < this.spawningRate) {
				this.spawnEnemy()
			}

			if (this.player.HP <= 0) {
				this.endGame()
			}
			this.score++
		}
	}

	spawnEnemy() {
		this.enemies.push(
			new Enemy(
				[0.5, 0.5, 0.5],
				new Vector3(
					Math.random() * this.ground - this.ground / 2,
					this.ground / 2 + 5,
					Math.random() * this.ground - this.ground / 2
				),
				'red'
			)
		)
	}

	removeEnemy(id: string) {
		this.enemies.forEach((enemy) => {
			if (enemy.id === id) {
				enemy.markedForDeletion = true
			}
		})
	}
}
