import { Serializable } from "../serialization/Serializable.js";
import { Localized } from "./Localized.js";


/** Defines a simple way to store localization data. */
export class Locale extends Serializable {

	// ------------------------------------------------------- PROTECTED FIELDS

	/** The global list of Locale instances. */
	static _instances: Record<string, Locale> = {};
	
	/** The default Locale instance. */
	static _default: Locale = new Locale('');
	
	/** The current Locale instance. */
	static _current: Locale;

	/** The id of the Locale (recommended to use ISO 639-1 codes). */
	protected _id: string;

	/** The name of the Locale. */
	protected _name: string; 

	/** The list of strings for this Locale. */
	protected _strings: Record<string, Localized<string>>;
	
	/** The number format of the Locale. */
	protected _numberFormat: RegExp = new RegExp
		(/^[+-]?(\d+([.]\d*)?([eE][+-]?\d+)?|[.]\d+([eE][+-]?\d+)?)$/);

	/** The time format of the Locale. */
	protected _timeFormat: string; 

	/** The date format of the Locale. */
	protected _dateFormat: string; 

	
	// ------------------------------------------------------  PUBLIC ACCESSORS

	/** The global list of Locale instances. */
	static get instances(): Record<string, Locale> { return Locale._instances; }

	/** The default Locale instance. */
	static get default(): Locale { return Locale._default; }

	/** The current Locale instance. */
	static get current(): Locale { return Locale._current; }
	static set current(locale: Locale | string | undefined) {
		if (!locale) locale = this._default;
		else if (typeof locale == 'string') {
			let id = locale; locale = this.instances[id];
			if (!locale) throw Error ('Invalid Locale Id: '+ id);
		}
		Locale._current = locale;
	}

	/** The id of the Locale (recommended to use ISO 639-1 codes). */
	get id(): string { return this._id; }

	/** The name of the Locale. */
	get name(): string { return this._name; }

	/** The list of strings for the Locale. */
	get strings(): Record<string, Localized<string>> { return this._strings; }

	/** The number format of the Locale. */
	get numberFormat(): RegExp { return this._numberFormat; }

	/** The time format of the Locale. */
	get timeFormat(): string { return this._timeFormat; }

	/** The date format of the Locale. */
	get dateFormat(): string { return this._dateFormat; }


	// ----------------------------------------------------- PUBLIC CONSTRUCTOR

	/** Initializes a new instance of the Locale class.
	 * @param {string} id The id of the locale.
	 * @param {object} [data] The initialization data */
	constructor(id: string, data: any = {}) {

		// Call the parent class constructor
		super();

		// Save the given values
		this._id = id || data.id;
		this._name = (id? data.name : "default") || null;

		// Add this instance to the global list
		if (Locale._instances[id]) throw Error('Repeated Locale ID: ' + id);
		Locale._instances[id] = this;

		// Initialize the lists of strings
		this._strings = {};

		// If there is any initialization data, deserialize it
		if (data != undefined) this.deserialize(data);
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the Locale instance from a data object.
	 * @param {*} data The data object with the data of the instance.
	 * @param {*} [params] The deserialization parameters. */
	deserialize(data: any, params: any = {}): void {
		// Copy the string data
		if (data.strings && typeof data.strings == 'object')
			for (let key in data.strings)
				this._strings[key] = data.strings[key];
		
		// Get the data formats
		this._timeFormat = data.timeFormat || 'HH:MM:SS';
		this._dateFormat = data.dateFormat || 'YYYY-MM-SS';
	}


	/** Serializes the Locale instance to a data object.
	* @param {*} [data] Additional data to include in the serialized object.
	* @param params The serialization parameters.
	* @return The data object with the data of the Locale instance. */
	serialize(data: any = {}, params: any = {}): any {
		
		// Save the id and the name of the locale
		data.id = this._id;  data.name = this._name; 

		// Copy the string data
		if (!data.strings) data.strings = {};
		for (let key in this._strings) data.strings[key] = this._strings[key];

		// Save the data formats
		data.timeFormat = this._timeFormat;
		data.dateFormat = this._dateFormat;

		// Return the resulting object
		return data;
	}
}
