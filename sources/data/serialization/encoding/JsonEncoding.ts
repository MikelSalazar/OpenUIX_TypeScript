import { SerializationDocument } from "../SerializationDocument.js";
import { SerializationNode } from "../SerializationNode.js";

/** Provides a way to encode to and decode from JSON strings. */
export class JsonEncoding {

	// ----------------------------------------------------- PUBLIC CONSTRUCTOR

	/** Initializes a new Serializer instance.
	 * @param {*} [params] The serialization parameters. */
	constructor(params: any = {}) {

		// Call the base class constructor
		// super(params);

		// this.singleLine = params.singleLine || false;
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Translates a JSON document to a SerializationNode.
	 * @param {SerializationDocument} document The JSON document.
	 * @returns The SerializationNode created from the JSON string. */
	decode(document: SerializationDocument): SerializationNode {

		// Get the size of the data string
		let chars = document.content, charCount = chars.length;
		if (charCount == 0) return;

		// Parse the string using a simple
		let lc = undefined, c = undefined, nc = undefined;

		// Start parsing
		let node = new SerializationNode(), nodes = [];
		let lastCharIndex = 0, states = ['any'];

		for (let charIndex = 0; charIndex < charCount; charIndex++) {

			// If no jump has not happened, just copy the previous values
			if (charIndex == lastCharIndex + 1) { lc = c; c = nc; }
			else { c = chars[charIndex]; 
				lc = (charIndex>0)? chars[charIndex-1] : undefined;
			}
			nc = (charIndex < charCount-1)? chars[charIndex+1] : undefined;
			lastCharIndex = charIndex;

			let state = states[states.length-1];
			switch (state) {
				case 'any': 
					if (c == '{') {
						states.push(state = 'object')
					} else if (c == '[') {
						states.push(state = 'array');
					} else if (c == '"') {
						states.push(state = 'string');
					} else if (c == '-' || c == '.' || (c >= '0' && c <= '9')) {
						states.push(state = 'number');
					} else if (c == 't' || c == 'f') {
						states.push(state = 'boolean');
					} else throw Error ('Invalid character "' + c + '" at ' + 
						charIndex +' while looking for: any');
					
				case 'boolean':
					if (charIndex + 4 < charCount && c == 't' && nc == 'r' &&
						chars[charIndex+2] == 'u' && chars[charIndex+3] == 'e'){
							charIndex += 4; node.content = true;
					} else if (charIndex + 5 < charCount  && c == 'f' && 
						nc == 'a' && chars[charIndex+2] == 'l' && 
						chars[charIndex+3] == 's' && chars[charIndex+2] == 'e'){
							charIndex += 5; node.content = false;
					}
					continue;
				default:
					return new SerializationNode(null, null, null);
			}
		}
		return node;
	}


	/** Translates a JSON string to a SerializationNode.
	 * @param {string} dataString The JSON string to parse.
	 * @param {*} [params] The serialization parameters.
	 * @returns The SerializationNode created from the JSON string. */
	static parse(dataString: string, params?: object): SerializationNode {
		return new JsonEncoding(params).decode(
			new SerializationDocument(null, null, dataString));
	}
}