// Declaring Packages
const fetch = require('node-fetch');

let methods = {
    get: require('../library/get')
}

module.exports = {
    version: "0.0.1",
    get: function(params) {
        if (!params) throw new TypeError(`No params declared, try again!`);
        return arbitrate('get', params);
    }
}

function arbitrate(method, params) {
    return methods[method](params);
}