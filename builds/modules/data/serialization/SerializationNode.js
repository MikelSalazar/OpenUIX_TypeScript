export class SerializationNode {
    get tag() { return this._tag; }
    set tag(newTag) { this._tag = newTag; }
    get format() { return this._format; }
    set format(newFormat) { this._format = newFormat; }
    get document() {
        return this._document ||
            (this._parent ? this._parent.document : undefined);
    }
    set document(newDocument) {
        this._document = newDocument;
    }
    get parent() { return this._parent; }
    get children() { return this._children; }
    get content() { return this.content; }
    set content(newContent) { this._content = newContent; }
    constructor(tag, parent, attributes, text, _start, _end) {
        this._tag = tag;
        this._parent = parent;
        this._children = [];
        if (parent)
            parent._children.push(this);
    }
}
//# sourceMappingURL=SerializationNode.js.map