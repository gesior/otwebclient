export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    equals(otherPoint) {
        return this.x == otherPoint.x && this.y == otherPoint.y;
    }
    clone() {
        return new Point(this.x, this.y);
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