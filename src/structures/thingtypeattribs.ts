import {ThingAttr} from "../constants/const";

export class ThingTypeAttribs {
    public attribs = {};

    has(attr: ThingAttr) {
        return this.attribs.hasOwnProperty(attr.toString());
    }

    get(attr: ThingAttr) {
        return this.attribs[attr];
    }

    set(attr: ThingAttr, value: any) {
        //console.log(attr, value);
        this.attribs[attr] = value;
    }

    remove(attr: ThingAttr) {
        delete this.attribs[attr];
    }

}