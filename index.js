module.exports = require("./handler/init.js");

String.prototype.titleCase = function() {
    var splitStr = this.toLowerCase()
        .split(" ");
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] =
            splitStr[i].charAt(0)
            .toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
};