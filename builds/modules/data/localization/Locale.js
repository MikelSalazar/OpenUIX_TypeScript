import { Serializable } from "../serialization/Serializable.js";
export class Locale extends Serializable {
    static get instances() { return Locale._instances; }
    static get default() { return Locale._default; }
    static get current() { return Locale._current; }
    static set current(locale) {
        if (!locale)
            locale = this._default;
        else if (typeof locale == 'string') {
            let id = locale;
            locale = this.instances[id];
            if (!locale)
                throw Error('Invalid Locale Id: ' + id);
        }
        Locale._current = locale;
    }
    get id() { return this._id; }
    get name() { return this._name; }
    get strings() { return this._strings; }
    get numberFormat() { return this._numberFormat; }
    get timeFormat() { return this._timeFormat; }
    get dateFormat() { return this._dateFormat; }
    constructor(id, data = {}) {
        super();
        this._numberFormat = new RegExp(/^[+-]?(\d+([.]\d*)?([eE][+-]?\d+)?|[.]\d+([eE][+-]?\d+)?)$/);
        this._id = id || data.id;
        this._name = (id ? data.name : "default") || null;
        if (Locale._instances[id])
            throw Error('Repeated Locale ID: ' + id);
        Locale._instances[id] = this;
        this._strings = {};
        if (data != undefined)
            this.deserialize(data);
    }
    deserialize(data, params = {}) {
        if (data.strings && typeof data.strings == 'object')
            for (let key in data.strings)
                this._strings[key] = data.strings[key];
        this._timeFormat = data.timeFormat || 'HH:MM:SS';
        this._dateFormat = data.dateFormat || 'YYYY-MM-SS';
    }
    serialize(data = {}, params = {}) {
        data.id = this._id;
        data.name = this._name;
        if (!data.strings)
            data.strings = {};
        for (let key in this._strings)
            data.strings[key] = this._strings[key];
        data.timeFormat = this._timeFormat;
        data.dateFormat = this._dateFormat;
        return data;
    }
}
Locale._instances = {};
Locale._default = new Locale('');
//# sourceMappingURL=Locale.js.map