export class Serialization {
    static isBoolean(text) {
        return RegExp(/^[false-true]/gu).test(text);
    }
    static isNumber(text) {
        return Serialization.numberRegex.test(text);
    }
    static isBigInt(text) { return RegExp(/^\-?[0-9]*n$/).test(text); }
    static isLetter(text) { return RegExp(/^\p{L}/gu).test(text); }
    static isValidName(name, strict = true) {
        if (name == undefined || name == '')
            return !strict;
        if (typeof name != 'string')
            name = '' + name;
        return RegExp(/^\p{L}[\p{L}\p{N}_-]*$/gu).test(name);
    }
}
Serialization.numberRegex = new RegExp(/^[+-]?(\d+([.]\d*)?([eE][+-]?\d+)?|[.]\d+([eE][+-]?\d+)?)$/);
//# sourceMappingURL=Serialization.js.map