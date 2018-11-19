import {Point} from "./point";
import {Size} from "./size";
import {Position} from "../position";

export class Rect {
    x1 = 0;
    y1 = 0;
    x2 = 0;
    y2 = 0;

    constructor(...args: any[]) {
        //TRect() : x1(0), y1(0), x2(-1), y2(-1) { }
        //TRect(T x, T y, T width, T height) : x1(x), y1(y), x2(x+width-1), y2(y+height-1) { }
        //TRect(const & topLeft, const & bottomRight) : x1(topLeft.x), y1(topLeft.y), x2(bottomRight.x), y2(bottomRight.y) { }
        //TRect(const TRect<T>& other) : x1(other.x1), y1(other.y1), x2(other.x2), y2(other.y2) { }
        //TRect(T x, T y, const TSize<T>& size) : x1(x), y1(y), x2(x+size.width()-1), y2(y+size.height()-1) { }
        //TRect(const & topLeft, const TSize<T>& size) : x1(topLeft.x), y1(topLeft.y), x2(x1+size.width()-1), y2(y1+size.height()-1) { }
        //TRect(const & topLeft, int width, int height) : x1(topLeft.x), y1(topLeft.y), x2(x1+width-1), y2(y1+height-1) { }

        if (args.length == 0) {
            this.x1 = 0;
            this.y1 = 0;
            this.x2 = -1;
            this.y2 = -1;
            return;
        } else if (args.length == 1) {
            if (args[0] instanceof Rect) {
                let other = <Rect> args[0];
                this.x1 = other.x1;
                this.y1 = other.y1;
                this.x2 = other.x2;
                this.y2 = other.y2;
                return;
            }
        } else if (args.length == 2) {
            if (args[0] instanceof Point && args[1] instanceof Point) {
                let topLeft = <Point> args[0];
                let bottomRight = <Point> args[1];
                this.x1 = topLeft.x;
                this.y1 = topLeft.y;
                this.x2 = bottomRight.x;
                this.y2 = bottomRight.y;
                return;
            } else if (args[0] instanceof Point && args[1] instanceof Size) {
                let topLeft = <Point> args[0];
                let size = <Size> args[1];
                this.x1 = topLeft.x;
                this.y1 = topLeft.y;
                this.x2 = this.x1 + size.width() - 1;
                this.y2 = this.y1 + size.height() - 1;
                return;
            }
        } else if (args.length == 3) {
            if (args[0] instanceof Point && typeof args[1] == 'number' && typeof args[2] == 'number') {
                let topLeft = <Point> args[0];
                let width = args[1];
                let height = args[2];
                this.x1 = topLeft.x;
                this.y1 = topLeft.y;
                this.x2 = this.x1 + width - 1;
                this.y2 = this.y1 + height - 1;
                return;
            } else if (typeof args[0] == 'number' && typeof args[1] == 'number' && args[2] instanceof Size) {
                let x = args[0];
                let y = args[1];
                let size = <Size> args[2];
                this.x1 = x;
                this.y1 = y;
                this.x2 = this.x1 + size.width() - 1;
                this.y2 = this.y1 + size.height() - 1;
                return;
            }
        } else if (args.length == 4) {
            if (typeof args[0] == 'number' && typeof args[1] == 'number' &&
                typeof args[2] == 'number' && typeof args[3] == 'number') {
                let x = args[0];
                let y = args[1];
                let width = args[2];
                let height = args[3];
                this.x1 = x;
                this.y1 = y;
                this.x2 = this.x1 + width - 1;
                this.y2 = this.y1 + height - 1;
                return;
            }
        }
        throw new Error('Invalid constructor parameters.');
    }

    equals(otherRect: Rect) {
        return this.x1 == otherRect.x1 && this.y1 == otherRect.y1 && this.x2 == otherRect.x2 && this.y2 == otherRect.y2;
    }

    clone(): Rect {
        return new Rect(this);
    }

    isNull(): boolean {
        return this.x2 == this.x1 - 1 && this.y2 == this.y1 - 1;
    }

    isEmpty(): boolean {
        return this.x1 > this.x2 || this.y1 > this.y2;
    }

    isValid(): boolean {
        return this.x1 <= this.x2 && this.y1 <= this.y2;
    }

    left(): number {
        return this.x1;
    }

    top(): number {
        return this.y1;
    }

    right(): number {
        return this.x2;
    }

    bottom(): number {
        return this.y2;
    }

    horizontalCenter(): number {
        return this.x1 + (this.x2 - this.x1) / 2;
    }

    verticalCenter(): number {
        return this.y1 + (this.y2 - this.y1) / 2;
    }

    x(): number {
        return this.x1;
    }

    y(): number {
        return this.y1;
    }

    topLeft(): Point {
        return new Point(this.x1, this.y1);
    }

    bottomRight(): Point {
        return new Point(this.x2, this.y2);
    }

    topRight(): Point {
        return new Point(this.x2, this.y1);
    }

    bottomLeft(): Point {
        return new Point(this.x1, this.y2);
    }

    topCenter(): Point {
        return new Point((this.x1 + this.x2) / 2, this.y1);
    }

    bottomCenter(): Point {
        return new Point((this.x1 + this.x2) / 2, this.y2);
    }

    centerLeft(): Point {
        return new Point(this.x1, (this.y1 + this.y2) / 2);
    }

    centerRight(): Point {
        return new Point(this.x2, (this.y1 + this.y2) / 2);
    }

    center(): Point {
        return new Point((this.x1 + this.x2) / 2, (this.y1 + this.y2) / 2);
    }

    width(): number {
        return this.x2 - this.x1 + 1;
    }

    height(): number {
        return this.y2 - this.y1 + 1;
    }

    size(): Size {
        return new Size(this.width(), this.height());
    }

    reset() {
        this.x1 = this.y1 = 0;
        this.x2 = this.y2 = -1;
    }

    clear() {
        this.x2 = this.x1 - 1;
        this.y2 = this.y1 - 1;
    }

    setLeft(pos: number) {
        this.x1 = pos;
    }

    setTop(pos: number) {
        this.y1 = pos;
    }

    setRight(pos: number) {
        this.x2 = pos;
    }

    setBottom(pos: number) {
        this.y2 = pos;
    }

    setX(x: number) {
        this.x1 = x;
    }

    setY(y: number) {
        this.y1 = y;
    }

    setTopLeft(p: Point) {
        this.x1 = p.x;
        this.y1 = p.y;
    }

    setBottomRight(p: Point) {
        this.x2 = p.x;
        this.y2 = p.y;
    }

    setTopRight(p: Point) {
        this.x2 = p.x;
        this.y1 = p.y;
    }

    setBottomLeft(p: Point) {
        this.x1 = p.x;
        this.y2 = p.y;
    }

    setWidth(width: number) {
        this.x2 = this.x1 + width - 1;
    }

    setHeight(height: number) {
        this.y2 = this.y1 + height - 1;
    }

    setSize(size: Size) {
        this.x2 = this.x1 + size.width() - 1;
        this.y2 = this.y1 + size.height() - 1;
    }

    setRect(x: number, y: number, width: number, height: number) {
        this.x1 = x;
        this.y1 = y;
        this.x2 = (x + width - 1);
        this.y2 = (y + height - 1);
    }

    setCoords(left: number, top: number, right: number, bottom: number) {
        this.x1 = left;
        this.y1 = top;
        this.x2 = right;
        this.y2 = bottom;
    }


    moveLeft(pos: number) {
        this.x2 += (pos - this.x1);
        this.x1 = pos;
    }

    moveTop(pos: number) {
        this.y2 += (pos - this.y1);
        this.y1 = pos;
    }

    moveRight(pos: number) {
        this.x1 += (pos - this.x2);
        this.x2 = pos;
    }

    moveBottom(pos: number) {
        this.y1 += (pos - this.y2);
        this.y2 = pos;
    }

    bind(r: Rect) {
        if (this.isNull() || r.isNull())
            return;

        if (this.right() > r.right())
            this.moveRight(r.right());
        if (this.bottom() > r.bottom())
            this.moveBottom(r.bottom());
        if (this.left() < r.left())
            this.moveLeft(r.left());
        if (this.top() < r.top())
            this.moveTop(r.top());
    }

    hash() : string {
        return this.left() + '_' + this.top() + '_' + this.right() + '_' + this.bottom();
    }
}