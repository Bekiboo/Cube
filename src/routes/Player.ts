// let player = {
//     size: [0.5, 0.5, 0.5],
//     pos: { x: -5, y: 0, z: -5 },
//     color: '#5D9FFF'
// }

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
