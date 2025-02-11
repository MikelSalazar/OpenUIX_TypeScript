import { SerializationElement } from "./SerializationElement";
export class SerializationRootElement extends SerializationElement {
    get tag() { return this._tag; }
    set tag(newTag) { this._tag = newTag; }
    get format() { return this._format; }
    set format(newFormat) { this._format = newFormat; }
    get document() {
        return this._document ||
            (this._parent ? this._parent.document : undefined);
    }
    set document(url) { this._document = url; }
    get parent() { return this._parent; }
    get children() { return this._children; }
    constructor(tag, document, attributes) {
        super(tag, undefined, attributes);
        this._document = document;
    }
}
//# sourceMappingURL=SerializationRootElement.js.map