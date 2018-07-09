export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(point) {
        return new Point(this.x + point.x, this.y + point.y);
    }
    sub(point) {
        return new Point(this.x - point.x, this.y - point.y);
    }
    mul(ratio) {
        return new Point(this.x * ratio, this.y * ratio);
    }
}
//# sourceMappingURL=point.js.map