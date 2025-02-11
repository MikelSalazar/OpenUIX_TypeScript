/** Defines a Serialization Document. */
export class SerializationDocument {

	// ---------------------------------------------------------- PUBLIC FIELDS

	/** The name of the SerializationDocument. */
	protected _name: string;

	/** The URL of the SerializationDocument. */
	protected _url: URL;

	/** The content of the SerializationDocument. */
	protected _content: string;


	// ------------------------------------------------------- PUBLIC ACCESSORS

	/** The name of the SerializationDocument. */
	get name(): string { return this._name; }

	/** The URL of the SerializationDocument. */
	get url(): URL { return this._url; }

	/** The content of the SerializationDocument. */
	get content(): string { return this._content; }



	// ----------------------------------------------------- PUBLIC CONSTRUCTOR

	/** Initializes a new instance of the SerializationDocument class.
	* @param {string} [name] The name of the SerializationDocument.
	* @param {string} [url] The url of the SerializationDocument.
	* @param {string} [content] The content of the SerializationDocument. */
	constructor(name?: string, url?: URL, content?: string) {

		// Save the given values
		this._name = name; this._url = url; this._content = content;
	}
}