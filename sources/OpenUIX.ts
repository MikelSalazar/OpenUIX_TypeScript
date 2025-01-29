// -------------------------------------------------------------------- IMPORTS

import { Serializable } from './data/serialization/Serializable.js';
import { Class } from './data/modeling/Class.js';
import { Instance } from './data/modeling/Instance.js';
import { Node } from './data/Node.js';


// -------------------------------------------------------------------- EXPORTS

export { Serializable } from './data/serialization/Serializable.js';
export { Class } from './data/modeling/Class.js';
export { Instance } from './data/modeling/Instance.js';
export { Node } from './data/Node.js';


/** The main class of the OpenUIX framework. */
export class OpenUIX extends Node {

	// ---------------------------------------------------------- PUBLIC FIELDS

	/** The list of instances of the OpenUIX class. */
	static readonly instances: OpenUIX[] = [];

    // ----------------------------------------------------- PUBLIC CONSTRUCTOR

	/** Initializes a new instance of the OpenUIX class.
	 * @param data The initialization data. */
    constructor(data: any) {

		super(data);

		OpenUIX.instances.push(this);
	}
}