import { Serializer } from "../Serializer.js";
import { Serializable } from "../Serializable.js";

/** Facilitates the JSON (de)serialization. 
 * @see  https://datatracker.ietf.org/doc/html/rfc8259 */
export class JsonSerializer extends Serializer {

	// ---------------------------------------------------------- PUBLIC FIELDS

	public singleLine: boolean;

	public multiLine: boolean;

	// ----------------------------------------------------- PUBLIC CONSTRUCTOR

	/** Initializes a new Serializer instance.
	 * @param {*} [params] The serialization parameters. */
	constructor(params: any = {}) {

		// Call the base class constructor
		super(params);

		this.singleLine = params.singleLine || false;
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Translates a JSON string to a data item.
	 * @param {string} dataString The JSON string to deserialize.
	 * @returns The data item extracted from the character string. */
	deserialize(dataString: string): any {

		// Get the size of the data string
		let chars = dataString, charCount = chars.length;
		if (charCount == 0) return;

		// Parse the string using a simple
		let lc = undefined, c = undefined, nc = undefined;

		// Start parsing
		let node = { start: 0, type: 'any'};
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
							charIndex += 4; return true;
					} else if (charIndex + 5 < charCount  && c == 'f' && 
						nc == 'a' && chars[charIndex+2] == 'l' && 
						chars[charIndex+3] == 's' && chars[charIndex+2] == 'e'){
							charIndex += 5; return false;
					}
					
					
				default:
					return states[states.length-1];
				

			}
		}
	}

	/** Translates a data item to a JSON string.
	 * @param {*} data The data item to serialize.
	 * @returns The JSON string representing the data item. */
	serialize(data: any, level: number = 0): string {

		// Check if the data is undefine
		if (data === undefined) return 'undefined';

		// if ((data instanceof Serializable))
		// return this.serializeData(serializable.serialize());

		// Get the type
		let type = (Array.isArray(data))? 'array' : typeof data, 
			text: string = '',
			start: string, end: string, items: string[];
			
		switch(type) {
			case 'boolean': text = data? 'true' : 'false' ; break;
			case 'bigint': text = data.toString() + 'n'; break; 
			case 'number': text = data.toString(); break;
			case 'string': text += '"' + data.replace(/\\/g,'\\') + '"'; break;
			case 'array': 
				items = [], start = '['; end = ']'
				for (let value of data) items.push(
					this.serialize(value, level + 1));
				break;
			case 'object': 
				items = [], start = '{'; end = '}'
				for (let key in data) items.push('"' + key + '": ' +
					this.serialize(data[key], level + 1));
				break;
		}

		// Check if multiline is necessary
		let multiLine = false;
		if (items) {
			if (!multiLine) {
				let firstItem = true;
				text = start + ' ';
				for (let item of items) {
					if (item.includes('\n')) { multiLine = true; break; }
					if (firstItem) firstItem = false; else text += ', ';
					text += item;
					if (text.length > 80) { multiLine = true; break; }
				}
				text += ' ' + end;
			}
			if (multiLine) {
				let firstItem = true;
				text = start + '\n' + '\t'.repeat(level + 1);
				for (let item of items) {
					if (firstItem) firstItem = false; 
					else text += ',\n' + '\t'.repeat(level + 1);
					text += item;
				}
				text += '\n' + '\t'.repeat(level) + end;
			}
		}

		// Return the generated text
		return text;
	}


	/** Translates a JSON string to a data item.
	 * @param {*} dataString The JSON string to deserialize.
	 * @param {*} [params] The deserialization parameters.
	 * @returns The data item extracted from the JSON string. */
	static deserialize(data: any, params?: object): string { 
		return (new JsonSerializer(params)).deserialize(data);
	}
	
	
	/** Translates a data item to a JSON string value.
	 * @param {*} serializable The Serializable instance to serialize.
	 * @param {*} [params] The serialization parameters.
	 * @returns The JSON string representing the data item. */
	static serialize(serializable: Serializable, params?: object): string { 
		return (new JsonSerializer(params)).serialize(serializable);
	}
	
	/** Translates a data item to a JSON string value.
	 * @param {*} data The data item to serialize.
	 * @param {*} [params] The serialization parameters.
	 * @returns The JSON string representing the data item. */
	static serializeData(data: any, params?: object): string { 
		return (new JsonSerializer(params)).serialize(data);
	}
}