import { Serializable } from "./Serializable.js";

/** An abstract class to generate serializers. */
export abstract class Serializer {

	// ----------------------------------------------------- PUBLIC CONSTRUCTOR

	/** Initializes a new Serializer instance.
	 * @param {*} [params] The serialization parameters. */
	constructor(params: any = {}) {

		// Enforce the abstract nature of the Serializable class
		if (this.constructor == Serializer) 
			throw Error ('Serializer is an abstract class');

	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Translates a character string to a data item.
	 * @param {string} dataString The character string to deserialize.
	 * @returns The data item extracted from the character string. */
	deserialize(dataString: string): any {
		throw Error ('Deserialize function not yet implemented'); 
	}


	/** Translates a data item to a character string value.
	 * @param {*} data The data item to serialize.
	 * @returns The character string representing the data item. */
	serialize(data: any): string {
		throw Error ('Serialize function not yet implemented'); 
	}


	/** Translates a character string to a data item.
	 * @param {string} dataString The character string to deserialize.
	 * @param {*} [params] The deserialization parameters.
	 * @returns The data item extracted from the character string. */
	static deserialize(dataString: string, params?: object): string { 
		throw Error ('Deserialize function not yet implemented'); 
	}


	/** Translates a data item to a character string value.
	 * @param {*} data The data item to serialize.
 	 * @param {*} [params] The serialization parameters.
	 * @returns The character string representing the data item. */
	static serialize(data: Serializable, params?: object): string { 
		throw Error ('Serialize function not yet implemented'); 
	}
}