import { Node } from './data/Node.js';
export { Serializable } from './data/serialization/Serializable.js';
export { Node } from './data/Node.js';
export class OpenUIX extends Node {
    constructor(data) {
        super('openuix', undefined, data);
        OpenUIX.instances.push(this);
    }
}
OpenUIX.instances = [];
//# sourceMappingURL=OpenUIX.js.map