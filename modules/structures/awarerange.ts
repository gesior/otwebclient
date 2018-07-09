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