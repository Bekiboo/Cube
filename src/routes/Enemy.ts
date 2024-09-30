import type { Vector3 } from 'three'

const getId = () => {
	return Math.random().toString(16).slice(2)
}
export class Enemy {
	size: [number, number, number]
	pos: Vector3
	color: string
	maxHP: number = 10
	HP: number
	markedForDeletion: boolean = false
	id: string

	constructor(size: [number, number, number], pos: Vector3, color: string) {
		this.size = size
		this.pos = pos
		this.color = color
		this.HP = this.maxHP
		this.id = getId()
	}
}
