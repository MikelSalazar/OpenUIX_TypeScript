import { Serializable } from "../serialization/Serializable.js";
import { Serialization } from "../serialization/Serialization.js";
export class Localized extends Serializable {
    get name() { return this._name; }
    get isUndefined() { return Object.keys(this._values).length == 0; }
    constructor(name, data) {
        super();
        this._name = name;
        if (this._name && !Serialization.isValidName(this._name))
            throw Error('Invalid name "' + this._name + '" for Localized');
        this._values = {};
    }
}
//# sourceMappingURL=Localized.js.map