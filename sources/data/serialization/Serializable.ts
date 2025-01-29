/** Defines a serializable object. */
export class Serializable {

	// ------------------------------------------------------- PROTECTED FIELDS
	
	/** The tag of the serializable object. */
	protected _tag: string;


	// ------------------------------------------------------- PUBLIC ACCESSORS

	/** The tag of the serializable object. */
	get tag(): string { return this._tag; }
	set tag(t: string) { this._tag = t; }


	// ----------------------------------------------------- PUBLIC CONSTRUCTOR

	/** Initializes a new instance of the Serializable class.
	 * @param {string} [tag] The tag of the serializable object.
	 * @param {*} [data] The initialization data. */
	constructor(tag?: string, data?: any) {
		this._tag = tag;
		if (data !== undefined) this.deserialize(data);
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes a JSON object into the current instance.
	 * @param data The deserialization data. */
	deserialize(data: any) {
		if (typeof data != 'object') return;
		let instance: any = this, keys = Object.keys(data);
		for (let key of keys) {
			if (key == '_tag') continue;
			if (instance[key] !== undefined) instance[key] = data[key];
			else throw Error('Unknown property: "' + key + '"');
		}
	}


	/** Serializes the instance into a JSON object.
	 * @returns The serialization data. */
	serialize() {
		let data: any = {}, instance: any = this, keys = Object.keys(instance);
		for (let key of keys) {
			if (key == '_tag') continue; // Skip the tag
			let property = instance[key];
			if (property !== undefined) {
				if (property.serialize) data[key] = property.serialize();
				else data[key] = property;
			}
		}
		return data;
	}
}