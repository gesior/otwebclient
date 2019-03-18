import { Direction, Otc } from "./constants/const";
export class Position {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    equals(otherPosition) {
        return this.x == otherPosition.x && this.y == otherPosition.y && this.z == otherPosition.z;
    }
    clone() {
        return new Position(this.x, this.y, this.z);
    }
    isMapPosition() {
        return (this.x >= 0 && this.y >= 0 && this.z >= 0 && this.x < 65535 && this.y < 65535 && this.z <= Otc.MAX_Z);
    }
    isValid() {
        return !(this.x == 65535 && this.y == 65535 && this.z == 255);
    }
    distance(pos) {
        return Math.sqrt(Math.pow((pos.x - this.x), 2) + Math.pow((pos.y - this.y), 2));
    }
    translate(dx, dy, dz = 0) {
        this.x += dx;
        this.y += dy;
        this.z += dz;
    }
    translated(dx, dy, dz = 0) {
        return new Position(this.x + dx, this.y + dy, this.z + dz);
    }
    // isInRange(pos: Position, minXRange: number, maxXRange: number, minYRange: number, maxYRange: number
    isInRange(pos, xRange, yRange, minYRange = null, maxYRange = null) {
        if (minYRange !== null && maxYRange !== null)
            return (pos.x >= this.x - xRange && pos.x <= this.x + yRange && pos.y >= this.y - minYRange && pos.y <= this.y + maxYRange && pos.z == this.z);
        else
            return Math.abs(this.x - pos.x) <= xRange && Math.abs(this.y - pos.y) <= yRange && this.z == pos.z;
    }
    static getAngleFromPositions(fromPos, toPos) {
        // Returns angle in radians from 0 to 2Pi. -1 means positions are equal.
        let dx = toPos.x - fromPos.x;
        let dy = toPos.y - fromPos.y;
        if (dx == 0 && dy == 0)
            return -1;
        let angle = Math.atan2(dy * -1, dx);
        if (angle < 0)
            angle += 2 * Math.PI;
        return angle;
    }
    static getDirectionFromPositions(fromPos, toPos) {
        let angle = Position.getAngleFromPositions(fromPos, toPos) * this.RAD_TO_DEC;
        if (angle >= 360 - 22.5 || angle < 0 + 22.5)
            return Direction.East;
        else if (angle >= 45 - 22.5 && angle < 45 + 22.5)
            return Direction.NorthEast;
        else if (angle >= 90 - 22.5 && angle < 90 + 22.5)
            return Direction.North;
        else if (angle >= 135 - 22.5 && angle < 135 + 22.5)
            return Direction.NorthWest;
        else if (angle >= 180 - 22.5 && angle < 180 + 22.5)
            return Direction.West;
        else if (angle >= 225 - 22.5 && angle < 225 + 22.5)
            return Direction.SouthWest;
        else if (angle >= 270 - 22.5 && angle < 270 + 22.5)
            return Direction.South;
        else if (angle >= 315 - 22.5 && angle < 315 + 22.5)
            return Direction.SouthEast;
        else
            return Direction.InvalidDirection;
    }
    getDirectionFromPosition(position) {
        return Position.getDirectionFromPositions(this, position);
    }
    up(n = 1) {
        let nz = this.z - n;
        if (nz >= 0 && nz <= Otc.MAX_Z) {
            this.z = nz;
            return true;
        }
        return false;
    }
    down(n = 1) {
        let nz = this.z + n;
        if (nz >= 0 && nz <= Otc.MAX_Z) {
            this.z = nz;
            return true;
        }
        return false;
    }
    coveredUp(n = 1) {
        let nx = this.x + n, ny = this.y + n, nz = this.z - n;
        if (nx >= 0 && nx <= 65535 && ny >= 0 && ny <= 65535 && nz >= 0 && nz <= Otc.MAX_Z) {
            this.x = nx;
            this.y = ny;
            this.z = nz;
            return true;
        }
        return false;
    }
    coveredDown(n = 1) {
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
Position.RAD_TO_DEC = (180.0 / Math.acos(-1));
//# sourceMappingURL=position.js.map