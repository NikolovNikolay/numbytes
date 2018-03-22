"use strict";

var Validator = require('../util/validator');

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var SingleValueParser = function () {
    function SingleValueParser() {
        _classCallCheck(this, SingleValueParser);
    }

    _createClass(SingleValueParser, [{
        key: "numberToBytes",
        value: function numberToBytes(targetPrimitive, value) {

            Validator.checkIfValueInBounds(targetPrimitive, value);

            var bytes = [];
            var bytesLen = targetPrimitive.bytes;
            var tempVal = value;

            for (var index = 0; index < bytesLen; index++) {
                var byte = tempVal & 0xff;
                bytes.push(byte);
                tempVal = (tempVal - byte) / 256;
            }

            return bytes;
        }
    }]);

    return SingleValueParser;
}();

module.exports = SingleValueParser;