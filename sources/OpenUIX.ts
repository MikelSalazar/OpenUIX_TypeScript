/** The main class of the OpenUIX framework. */
export class OpenUIX {

	// ---------------------------------------------------------- PUBLIC FIELDS

	/** The list of instances of the OpenUIX class. */
	static readonly instances: OpenUIX[] = [];

    // ----------------------------------------------------- PUBLIC CONSTRUCTOR

	/** Initializes a new instance of the OpenUIX class.
	 * @param data The initialization data. */
    constructor(data: any) {

		OpenUIX.instances.push(this);
	}
}