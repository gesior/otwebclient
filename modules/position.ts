
export class Position {
    translated(dx: number, dy: number, dz: number = 0): Position {
        return new Position(this.x + dx, this.y + dy, this.z + dz);
    }

    constructor(public x: number = 0, public y: number = 0, public z: number = 0) {}
}
