import { SerializationDocument } from "./SerializationDocument";

/** Defines a Serialization Node. */
export class SerializationNode {

	// ---------------------------------------------------------- PUBLIC FIELDS

	/** The tag of the SerializationNode. */
	protected _tag: string;

	/** The parent Node of the SerializationNode. */
	protected _parent: SerializationNode;

	/** The document of the SerializationNode. */
	protected _document: SerializationDocument;

	/** The child nodes of the SerializationNode. */
	protected _children: SerializationNode[];

	/** The format of the SerializationNode. */
	protected _format: string;

	/** The keys of the SerializationNode. */
	protected _keys: string[];

	/** The values of the SerializationNode. */
	protected _values: any[];

	/** The text of the SerializationNode. */
	protected _text: string;

	/** The content of the SerializationNode. */
	protected _content: any;

<<<<<<< HEAD
	/** The start position of the SerializationNode in the document. */
	protected _startPosition: URL;

	/** The end position of the SerializationNode in the document. */
=======
	/** The start position of the SerializationNode. */
	protected _startPosition: URL;

	/** The end position of the SerializationNode in the . */
>>>>>>> 5ed89ce9db5b51dfc9a12ae03244c3d25e013cd4
	protected _endPosition: URL;


	// ------------------------------------------------------- PUBLIC ACCESSORS

	/** The tag of the serializable object. */
	get tag(): string { return this._tag; }
	set tag(newTag: string) { this._tag = newTag; }

	/** The tag of the serializable object. */
	get format(): string { return this._format; }
	set format(newFormat: string) { this._format = newFormat; }

	/** The document of the SerializationNode. */
	get document(): SerializationDocument { return this._document || 
		(this._parent ? this._parent.document : undefined); 
	}
	set document(newDocument: SerializationDocument) { 
		this._document = newDocument;
	}

	/** The parent Node of the SerializationNode. */
	get parent(): SerializationNode { return this._parent; }

	/** The child Nodes of the SerializationNode. */
	get children(): SerializationNode[] { return this._children; }
	
	/** The content of the serializable object. */
	get content(): any { return this.content; }
	set content(newContent: any) { this._content = newContent; }

	
	// ----------------------------------------------------- PUBLIC CONSTRUCTOR

	/** Initializes a new instance of the SerializationNode class.
	 * @param {string} [tag] The tag of the serializable object.
	 * @param {*} [data] The initialization data. */
	constructor(tag?: string, parent?: SerializationNode, attributes?: any,
		text?: string, _start?: number, _end? : number
	) {

		// Save the tag
		this._tag = tag;

		// Create the connection between parent and children 
		this._parent = parent; this._children = []; 
		if (parent) parent._children.push(this);
	}
}