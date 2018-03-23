"use strict";

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

var Validator = function () {
    function Validator() {
        _classCallCheck(this, Validator);
    }

    _createClass(Validator, null, [{
        key: "checkIfValidNumber",
        value: function checkIfValidNumber(value) {
            return typeof value === "number" && !isNaN(parseFloat(value)) && isFinite(value);
        }
    }, {
        key: "checkIfValueInBounds",
        value: function checkIfValueInBounds(primitive, value) {
            if (!this.checkIfValidNumber(value)) {
                throw new Error("Not a valid value to parse - " + value);
            }

            if (value < primitive.min || value > primitive.max) {
                throw new Error("Value not in target primitive validity range: "
                    + primitive.min + "<= value <= " + primitive.max);
            }
        }
    }]);

    return Validator;
}();

module.exports = Validator;