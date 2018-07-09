export class Position {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    translated(dx, dy, dz = 0) {
        return new Position(this.x + dx, this.y + dy, this.z + dz);
    }
}
//# sourceMappingURL=position.js.map