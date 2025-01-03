/** The main class of the OpenUIX framework. */
var OpenUIX = /** @class */ (function () {
    // ----------------------------------------------------- PUBLIC CONSTRUCTOR
    /** Initializes a new instance of the OpenUIX class.
     * @param data The initialization data. */
    function OpenUIX(data) {
        OpenUIX.instances.push(this);
    }
    // ---------------------------------------------------------- PUBLIC FIELDS
    /** The list of instances of the OpenUIX class. */
    OpenUIX.instances = [];
    return OpenUIX;
}());
export { OpenUIX };
//# sourceMappingURL=OpenUIX.js.map