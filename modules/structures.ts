import {AnimationDirection, AnimationPhase, ThingAttr} from "./constants/const";
import {Image} from "./image";

export class UnjustifiedPoints {
    killsDay: number;
    killsDayRemaining: number;
    killsWeek: number;
    killsWeekRemaining: number;
    killsMonth: number;
    killsMonthRemaining: number;
    skullTime: number;
}

export class AwareRange {
    top: number = 6;
    right: number = 9;
    bottom: number = 7;
    left: number = 8;

    horizontal(): number {
        return this.left + this.right + 1;
    }

    vertical(): number {
        return this.top + this.bottom + 1;
    }
}

export class MarketData {
    name: string;
    category: number;
    requiredLevel: number;
    restrictVocation: number;
    showAs: number;
    tradeAs: number;
}

export class Light {
    intensity: number = 0;
    color: number = 215;
}

export class g_clock {
    static millis() {
        return +new Date();
    }
}

export class Timer {
    m_startTicks: number = 0;
    m_stopped: boolean = false;

    constructor() {
        this.restart();
    }

    restart() {
        this.m_startTicks = g_clock.millis();
        this.m_stopped = false;
    }

    stop() {
        this.m_stopped = true;
    }

    startTicks() {
        return this.m_startTicks;
    }

    ticksElapsed(): number {
        return g_clock.millis() - this.m_startTicks;
    }

    timeElapsed(): number {
        return this.ticksElapsed() / 1000;
    }

    running(): boolean {
        return !this.m_stopped;
    }
}

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

export class Rect {
    constructor(p1: Point, p2: Point) {

    }


}

export class Texture {
    m_id = 0;
    m_time = 0;
    m_size: Size;
    mglSize: Size;
    m_hasMipmaps = false;
    m_smooth = false;
    m_upsideDown = false;
    m_repeat = false;

    constructor(image: Image, buildMipmaps: boolean = false, compress: boolean = false) {

    }
}

export class Size {
    constructor(private wd: number = -1, private ht: number = -1) {

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

export class ThingTypeAttribs {
    private attribs = {};

    has(attr: ThingAttr) {
        return this.attribs.hasOwnProperty(attr.toString());
    }

    get(attr: ThingAttr) {
        return this.attribs[attr];
    }

    set(attr: ThingAttr, value: any) {
        this.attribs[attr] = value;
    }

    remove(attr: ThingAttr) {
        delete this.attribs[attr];
    }

}