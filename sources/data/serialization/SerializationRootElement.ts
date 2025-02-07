import { SerializationElement } from "./SerializationElement";

/** Defines a root Serialization element. */
export class SerializationRootElement extends SerializationElement {

	// ---------------------------------------------------------- PUBLIC FIELDS

	/** The tag of the SerializationElement. */
	protected _tag: string;

	/** The parent element of the SerializationElement. */
	protected _parent: SerializationElement;

	/** The child elements of the SerializationElement. */
	protected _children: SerializationElement[];

	/** The format of the SerializationElement. */
	protected _format: string;

	/** The keys elements of the SerializationElement. */
	protected _keys: string[];

	/** The values of the SerializationElement. */
	protected _values: any[];

	/** The text elements of the SerializationElement. */
	protected _text: string;

	/** The path of the document of the SerializationElement. */
	protected _document: URL;

	/** The start position of the SerializationElement. */
	protected _startPosition: URL;

	/** The end position  of the SerializationElement. */
	protected _endPosition: URL;


	// ------------------------------------------------------- PUBLIC ACCESSORS

	/** The tag of the serializable object. */
	get tag(): string { return this._tag; }
	set tag(newTag: string) { this._tag = newTag; }

	/** The tag of the serializable object. */
	get format(): string { return this._format; }
	set format(newFormat: string) { this._format = newFormat; }

	/** The path of the document of the SerializationElement. */
	get document(): URL { return this._document || 
		(this._parent ? this._parent.document : undefined); 
	}
	set document(url: URL) { this._document = url; }

	/** The parent element of the SerializationElement. */
	get parent(): SerializationElement { return this._parent; }

	/** The child elements of the SerializationElement. */
	get children(): SerializationElement[] { return this._children; }
	

	// ----------------------------------------------------- PUBLIC CONSTRUCTOR

	/** Initializes a new instance of the SerializationElement class.
	 * @param {string} [tag] The tag of the serializable object.
	 * @param {*} [data] The initialization data. */
	constructor(tag?: string, document?: URL, attributes?: any) {
		// Call the base class constructor
		super(tag, undefined, attributes)

		// Save the tag
		this._document = document;
	}
}