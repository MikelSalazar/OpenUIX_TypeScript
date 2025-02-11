import { Serializable } from "../serialization/Serializable.js";
import { Serialization } from "../serialization/Serialization.js";
import { Locale } from "./Locale.js";

/** Defines a Localized data item. */
export class Localized<ValueType> extends Serializable {

	// ------------------------------------------------------- PROTECTED FIELDS
	
	/** The name of the localized data item. */
	protected _name: string;

	/** The values of the localized data item. */
	protected _values: Record<string, ValueType>;

	
	// ------------------------------------------------------- PUBLIC ACCESSORS

	/** The name of localized data item. */
	get name(): string { return this._name; }
	
	/** Indicates whether the localized data item has values or not. */
	get isUndefined(): boolean { return Object.keys(this._values).length == 0; }

	/** The current value of localized data item. */
	// get value(): ValueType | undefined {return this._values[Locale.current.id];}
	// set value(v: ValueType | undefined) { this._values[Locale.current.id] = v; }
	
	// /** The locale ids of the localized data item. */
	// get locales(): string[] { return Object.keys(this._values); }

	// /** The current value of localized data item. */
	// get values(): ValueType { return this._values[Locale.current.id]; }
	

	// ----------------------------------------------------- PUBLIC CONSTRUCTOR

	/** Initializes a new instance of the Localized class.
	 * @param {string} name The name of the localized data item.
	 * @param {*} [data] The initialization data. */
	constructor(name?: string, data?: any) {

		// Call the parent class constructor
		super();

		// The name of the localized string (can be undefined)
		this._name = name;
		if (this._name && !Serialization.isValidName(this._name)) 
			throw Error('Invalid name "' + this._name + '" for Localized');

		// Initialize the record of values
		this._values = {};

		// Deserialize the given data
		// if (data != undefined) this.deserialize(data);
	}

}