export class AwareRange {
    constructor() {
        this.top = 6;
        this.right = 9;
        this.bottom = 7;
        this.left = 8;
    }
    horizontal() {
        return this.left + this.right + 1;
    }
    vertical() {
        return this.top + this.bottom + 1;
    }
}
//# sourceMappingURL=awarerange.js.map