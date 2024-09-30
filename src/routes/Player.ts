export class Player {
	size: number
	pos: { x: number; y: number; z: number }
	color: string
	maxHP: number = 10
	HP: number

	constructor(size: number, pos: { x: number; y: number; z: number }, color: string) {
		this.size = size
		this.pos = pos
		this.color = color
		this.HP = this.maxHP
	}
}
