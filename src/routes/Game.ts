import { Vector3 } from 'three'
import { Player } from './Player'
import { Enemy } from './Enemy'

export class Game {
	state: 'Menu' | 'Playing' | 'GameOver'
	score: number
	highScore: number
	player: Player
	timeGameStarted: number
	spawningRate: number
	enemies: Enemy[] = []
	ground: number
	timer: number

	constructor() {
		this.state = 'Menu'
		this.score = 0
		this.highScore = 0
		this.ground = 35
		this.player = new Player(0.5, { x: 0, y: 0 + 0.5, z: 0 }, '#5D9FFF')
		this.timer = 0
	}

	startGame() {
		this.state = 'Playing'
		this.score = 0
		this.timer = 0
		this.player.HP = this.player.maxHP
		this.timeGameStarted = Date.now()
		this.enemies.push(
			new Enemy(
				[0.5, 5, 0.5],
				new Vector3(
					Math.random() * this.ground - this.ground / 2,
					this.ground / 2 + 10,
					Math.random() * this.ground - this.ground / 2
				),
				'red'
			)
		)
	}

	endGame() {
		this.state = 'GameOver'
		this.highScore = Math.max(this.score, this.highScore)
		this.enemies = []
	}

	update() {
		if (this.state === 'Playing') {
			this.spawningRate = 0.01 + (Date.now() - this.timeGameStarted) / 100_000_0

			// spawn enemies
			if (Math.random() < this.spawningRate) {
				this.enemies.push(
					new Enemy(
						[0.5, 5, 0.5],
						new Vector3(
							Math.random() * this.ground - this.ground / 2,
							this.ground / 2 + 5,
							Math.random() * this.ground - this.ground / 2
						),
						'red'
					)
				)
			}

			if (this.player.HP <= 0) {
				this.endGame()
			}
			this.timer++
		}
	}

	removeEnemy(id: string) {
		this.enemies.forEach((enemy) => {
			if (enemy.id === id) {
				enemy.markedForDeletion = true
			}
		})
	}

	increaseScore() {
		this.score++
	}

	decreaseScore() {
		this.score--
	}
}
