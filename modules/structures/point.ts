import {Position} from "../position";

export class Point {

    constructor(public x: number, public y: number) {

    }

    equals(otherPoint: Point): boolean {
        return this.x == otherPoint.x && this.y == otherPoint.y;
    }

    clone(): Point {
        return new Point(this.x, this.y);
    }

    add(point: Point): Point {
        return new Point(this.x + point.x, this.y + point.y);
    }

    sub(point: Point): Point {
        return new Point(this.x - point.x, this.y - point.y);
    }

    mul(ratio: number): Point {
        return new Point(this.x * ratio, this.y * ratio);
    }
}