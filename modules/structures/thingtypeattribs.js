export class ThingTypeAttribs {
    constructor() {
        this.attribs = {};
    }
    has(attr) {
        return this.attribs.hasOwnProperty(attr.toString());
    }
    get(attr) {
        return this.attribs[attr];
    }
    set(attr, value) {
        //console.log(attr, value);
        this.attribs[attr] = value;
    }
    remove(attr) {
        delete this.attribs[attr];
    }
}
//# sourceMappingURL=thingtypeattribs.js.map