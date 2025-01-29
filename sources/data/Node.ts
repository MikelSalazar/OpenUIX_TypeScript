import { Instance } from "../OpenUIX.js";

/** Defines a Node of a hierarchical data structure. */
export class Node extends Instance {

	// ----------------------------------------------------- PUBLIC CONSTRUCTOR

	/** Initializes a new instance of the Node class.
	 * @param {string} name The name of the node.
	 * @param {Node} [parent] The parent node (or the a link to it).
	 * @param {*} [data] The initialization data.
	 * @param {Metadata} [metadata] The metadata of the node. */
	constructor(name: string, parent?: Node, data?: any) {
		super(name, data);
	}
}