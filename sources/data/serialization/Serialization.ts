import { Serializable } from "./Serializable.js";

/** A utility class that facilitates the (de)serialization process. */
export class Serialization {

	static numberRegex : RegExp = new RegExp
	(/^[+-]?(\d+([.]\d*)?([eE][+-]?\d+)?|[.]\d+([eE][+-]?\d+)?)$/);
	
	// ---------------------------------------------------------- PUBLIC METHODS

	/** Checks if a text is a boolean value.
	 * @param {string} text The text to validate.
	 * @returns A boolean value indicating if the text is a boolean or not. */
	static isBoolean(text: string) { 
		return RegExp(/^[false-true]/gu).test(text); 
	}

	/** Checks if a text is a numerical value.
	 * @param {string} text The text to validate.
	 * @returns A boolean value indicating if the text is a boolean or not. */
	static isNumber(text: string) { 
		
		return Serialization.numberRegex.test(text); 
	}


	/** Checks if a text contains a big integer value.
	 * @param {string} text The text to validate.
	 * @returns A boolean value indicating if the text is a boolean or not. */
	static isBigInt(text: string) { return RegExp(/^\-?[0-9]*n$/).test(text); }


	/** Checks if a character is a letter.
	 * @param {string} text The text to validate.
	 * @returns A boolean value indicating if the text is a letter or not. */
	static isLetter(text: string) { return RegExp(/^\p{L}/gu).test(text); }


	/** Validates if a string is a valid name (a combination of letters, 
	 * numbers and dashes, starting with a letter).
	 * @param {name} text The name to validate.
	 * @param {boolean} [strict] Whether to accept null or void names .
	 * @returns A boolean value with the result of the validation. */
	static isValidName(name: string, strict: boolean = true): boolean {
		if (name == undefined || name == '') return !strict
		if (typeof name != 'string') name = '' + name;
		return RegExp(/^\p{L}[\p{L}\p{N}_-]*$/gu).test(name);
	}
}
