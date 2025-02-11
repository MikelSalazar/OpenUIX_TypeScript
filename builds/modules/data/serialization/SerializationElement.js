export class SerializationElement {
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
    constructor(tag, parent, attributes, text, _start, _end) {
        this._tag = tag;
        this._parent = parent;
        this._children = [];
        if (parent)
            parent._children.push(this);
    }
}
//# sourceMappingURL=SerializationElement.js.map