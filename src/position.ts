import {Otc} from "./constants/const";

export class Position {
    constructor(public x: number = 0, public y: number = 0, public z: number = 0) {
    }

    equals(otherPosition: Position) {
        return this.x == otherPosition.x && this.y == otherPosition.y && this.z == otherPosition.z;
    }

    clone(): Position {
        return new Position(this.x, this.y, this.z);
    }

    isMapPosition(): boolean {
        return (this.x >= 0 && this.y >= 0 && this.z >= 0 && this.x < 65535 && this.y < 65535 && this.z <= Otc.MAX_Z);
    }

    isValid(): boolean {
        return !(this.x == 65535 && this.y == 65535 && this.z == 255);
    }

    distance(pos: Position): number {
        return Math.sqrt(Math.pow((pos.x - this.x), 2) + Math.pow((pos.y - this.y), 2));
    }

    translate(dx: number, dy: number, dz: number = 0) {
        this.x += dx;
        this.y += dy;
        this.z += dz;
    }

    translated(dx: number, dy: number, dz: number = 0): Position {
        return new Position(this.x + dx, this.y + dy, this.z + dz);
    }

    isInRange(pos: Position, xRange: number, yRange: number): boolean {
        return Math.abs(this.x - pos.x) <= xRange && Math.abs(this.y - pos.y) <= yRange && this.z == pos.z;
    }

    /*
        isInRange(pos: Position, minXRange: number, maxXRange: number, minYRange: number, maxYRange: number): boolean {
            return (pos.x >= this.x - minXRange && pos.x <= this.x + maxXRange && pos.y >= this.y - minYRange && pos.y <= this.y + maxYRange && pos.z == this.z);
        }
    */
    up(n: number = 1): boolean {
        let nz = this.z - n;
        if (nz >= 0 && nz <= Otc.MAX_Z) {
            this.z = nz;
            return true;
        }
        return false;
    }

    down(n: number = 1): boolean {
        let nz = this.z + n;
        if (nz >= 0 && nz <= Otc.MAX_Z) {
            this.z = nz;
            return true;
        }
        return false;
    }

    coveredUp(n: number = 1): boolean {
        let nx = this.x + n, ny = this.y + n, nz = this.z - n;
        if (nx >= 0 && nx <= 65535 && ny >= 0 && ny <= 65535 && nz >= 0 && nz <= Otc.MAX_Z) {
            this.x = nx;
            this.y = ny;
            this.z = nz;
            return true;
        }
        return false;
    }

    coveredDown(n: number = 1): boolean {
        let nx = this.x - n, ny = this.y - n, nz = this.z + n;
        if (nx >= 0 && nx <= 65535 && ny >= 0 && ny <= 65535 && nz >= 0 && nz <= Otc.MAX_Z) {
            this.x = nx;
            this.y = ny;
            this.z = nz;
            return true;
        }
        return false;
    }
}
