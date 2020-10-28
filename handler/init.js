// Declaring Packages
const fetch = require('node-fetch');

let methods = {
    getSpecific: require('../library/getSpecific'),
    getAll: require('../library/getAll')
}

module.exports = {
    version: "0.0.4",
    getSpecific: function(params) {
        if (!params) throw new TypeError(`Example: hyskydata.get(["ARRAY_OF_ITEMS"])`);
        return arbitrate('getSpecific', params);
    },
    getAll: function() {
        return arbitrate('getAll');
    }
}

function arbitrate(method, params) {
    return methods[method](params);
}