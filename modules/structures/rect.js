import { Point } from "./point";
import { Size } from "./size";
export class Rect {
    constructor(...args) {
        //TRect() : x1(0), y1(0), x2(-1), y2(-1) { }
        //TRect(T x, T y, T width, T height) : x1(x), y1(y), x2(x+width-1), y2(y+height-1) { }
        //TRect(const & topLeft, const & bottomRight) : x1(topLeft.x), y1(topLeft.y), x2(bottomRight.x), y2(bottomRight.y) { }
        //TRect(const TRect<T>& other) : x1(other.x1), y1(other.y1), x2(other.x2), y2(other.y2) { }
        //TRect(T x, T y, const TSize<T>& size) : x1(x), y1(y), x2(x+size.width()-1), y2(y+size.height()-1) { }
        //TRect(const & topLeft, const TSize<T>& size) : x1(topLeft.x), y1(topLeft.y), x2(x1+size.width()-1), y2(y1+size.height()-1) { }
        //TRect(const & topLeft, int width, int height) : x1(topLeft.x), y1(topLeft.y), x2(x1+width-1), y2(y1+height-1) { }
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = 0;
        if (args.length == 0) {
            this.x1 = 0;
            this.y1 = 0;
            this.x2 = -1;
            this.y2 = -1;
            return;
        }
        else if (args.length == 1) {
            if (args[0] instanceof Rect) {
                let other = args[0];
                this.x1 = other.x1;
                this.y1 = other.y1;
                this.x2 = other.x2;
                this.y2 = other.y2;
                return;
            }
        }
        else if (args.length == 2) {
            if (args[0] instanceof Point && args[1] instanceof Point) {
                let topLeft = args[0];
                let bottomRight = args[1];
                this.x1 = topLeft.x;
                this.y1 = topLeft.y;
                this.x2 = bottomRight.x;
                this.y2 = bottomRight.y;
                return;
            }
            else if (args[0] instanceof Point && args[1] instanceof Size) {
                let topLeft = args[0];
                let size = args[1];
                this.x1 = topLeft.x;
                this.y1 = topLeft.y;
                this.x2 = this.x1 + size.width() - 1;
                this.y2 = this.y1 + size.height() - 1;
                return;
            }
        }
        else if (args.length == 3) {
            if (args[0] instanceof Point && typeof args[1] == 'number' && typeof args[2] == 'number') {
                let topLeft = args[0];
                let width = args[1];
                let height = args[2];
                this.x1 = topLeft.x;
                this.y1 = topLeft.y;
                this.x2 = this.x1 + width - 1;
                this.y2 = this.y1 + height - 1;
                return;
            }
            else if (typeof args[0] == 'number' && typeof args[1] == 'number' && args[2] instanceof Size) {
                let x = args[0];
                let y = args[1];
                let size = args[2];
                this.x1 = x;
                this.y1 = y;
                this.x2 = this.x1 + size.width() - 1;
                this.y2 = this.y1 + size.height() - 1;
                return;
            }
        }
        else if (args.length == 4) {
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
    equals(otherRect) {
        return this.x1 == otherRect.x1 && this.y1 == otherRect.y1 && this.x2 == otherRect.x2 && this.y2 == otherRect.y2;
    }
    clone() {
        return new Rect(this);
    }
    isNull() {
        return this.x2 == this.x1 - 1 && this.y2 == this.y1 - 1;
    }
    isEmpty() {
        return this.x1 > this.x2 || this.y1 > this.y2;
    }
    isValid() {
        return this.x1 <= this.x2 && this.y1 <= this.y2;
    }
    left() {
        return this.x1;
    }
    top() {
        return this.y1;
    }
    right() {
        return this.x2;
    }
    bottom() {
        return this.y2;
    }
    horizontalCenter() {
        return this.x1 + (this.x2 - this.x1) / 2;
    }
    verticalCenter() {
        return this.y1 + (this.y2 - this.y1) / 2;
    }
    x() {
        return this.x1;
    }
    y() {
        return this.y1;
    }
    topLeft() {
        return new Point(this.x1, this.y1);
    }
    bottomRight() {
        return new Point(this.x2, this.y2);
    }
    topRight() {
        return new Point(this.x2, this.y1);
    }
    bottomLeft() {
        return new Point(this.x1, this.y2);
    }
    topCenter() {
        return new Point((this.x1 + this.x2) / 2, this.y1);
    }
    bottomCenter() {
        return new Point((this.x1 + this.x2) / 2, this.y2);
    }
    centerLeft() {
        return new Point(this.x1, (this.y1 + this.y2) / 2);
    }
    centerRight() {
        return new Point(this.x2, (this.y1 + this.y2) / 2);
    }
    center() {
        return new Point((this.x1 + this.x2) / 2, (this.y1 + this.y2) / 2);
    }
    width() {
        return this.x2 - this.x1 + 1;
    }
    height() {
        return this.y2 - this.y1 + 1;
    }
    size() {
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
    setLeft(pos) {
        this.x1 = pos;
    }
    setTop(pos) {
        this.y1 = pos;
    }
    setRight(pos) {
        this.x2 = pos;
    }
    setBottom(pos) {
        this.y2 = pos;
    }
    setX(x) {
        this.x1 = x;
    }
    setY(y) {
        this.y1 = y;
    }
    setTopLeft(p) {
        this.x1 = p.x;
        this.y1 = p.y;
    }
    setBottomRight(p) {
        this.x2 = p.x;
        this.y2 = p.y;
    }
    setTopRight(p) {
        this.x2 = p.x;
        this.y1 = p.y;
    }
    setBottomLeft(p) {
        this.x1 = p.x;
        this.y2 = p.y;
    }
    setWidth(width) {
        this.x2 = this.x1 + width - 1;
    }
    setHeight(height) {
        this.y2 = this.y1 + height - 1;
    }
    setSize(size) {
        this.x2 = this.x1 + size.width() - 1;
        this.y2 = this.y1 + size.height() - 1;
    }
    setRect(x, y, width, height) {
        this.x1 = x;
        this.y1 = y;
        this.x2 = (x + width - 1);
        this.y2 = (y + height - 1);
    }
    setCoords(left, top, right, bottom) {
        this.x1 = left;
        this.y1 = top;
        this.x2 = right;
        this.y2 = bottom;
    }
    moveLeft(pos) {
        this.x2 += (pos - this.x1);
        this.x1 = pos;
    }
    moveTop(pos) {
        this.y2 += (pos - this.y1);
        this.y1 = pos;
    }
    moveRight(pos) {
        this.x1 += (pos - this.x2);
        this.x2 = pos;
    }
    moveBottom(pos) {
        this.y1 += (pos - this.y2);
        this.y2 = pos;
    }
    bind(r) {
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
}
//# sourceMappingURL=rect.js.map