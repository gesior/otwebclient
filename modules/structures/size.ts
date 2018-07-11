import {Position} from "../position";

export class Size {
    constructor(private wd: number = -1, private ht: number = -1) {

    }

    equals(otherSize: Size): boolean {
        return this.wd == otherSize.wd && this.ht == otherSize.ht;
    }

    clone(): Size {
        return new Size(this.wd, this.ht);
    }

    add(size: Size): Size {
        return new Size(this.wd+size.wd, this.ht+size.ht);
    }
    sub(size: Size): Size {
        return new Size(this.wd-size.wd, this.ht-size.ht);
    }
    mul(ratio: number): Size {
        return new Size(this.wd*ratio, this.ht*ratio);
    }

    isNull(): boolean {
        return this.wd == 0 && this.ht == 0;
    }

    isEmpty() {
        return this.wd < 1 || this.ht < 1;
    }

    isValid() {
        return this.wd >= 0 && this.ht >= 0;
    }

    width(): number {
        return this.wd;
    }

    height(): number {
        return this.ht;
    }

    resize(w: number, h: number) {
        this.wd = w;
        this.ht = h;
    }

    setWidth(w: number) {
        this.wd = w;
    }

    setHeight(h: number) {
        this.ht = h;
    }

    ratio(): number {
        return this.wd / this.ht;
    }

    area(): number {
        return this.wd * this.ht;
    }
}