export class Point {

    constructor(public x: number, public y: number) {

    }
    add(point: Point): Point {
        return new Point(this.x+point.x, this.y+point.y);
    }
    sub(point: Point): Point {
        return new Point(this.x-point.x, this.y-point.y);
    }
    mul(ratio: number): Point {
        return new Point(this.x*ratio, this.y*ratio);
    }
}