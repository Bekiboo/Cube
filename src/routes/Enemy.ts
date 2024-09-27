import type { Vector3 } from 'three'

export class Enemy {
	size: [number, number, number]
	pos: Vector3
	color: string
	maxHP: number = 10
	HP: number
	handle: number

	constructor(size: [number, number, number], pos: Vector3, color: string) {
		this.size = size
		this.pos = pos
		this.color = color
		this.HP = this.maxHP
	}
}
