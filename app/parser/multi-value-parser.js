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

var MultiValueParser = function () {
    function MultiValueParser(singleValueParser) {
        _classCallCheck(this, MultiValueParser);

        this.singleValueParser = singleValueParser;
    }

    _createClass(MultiValueParser, [{
        key: "parseMultiple",
        value: function parseMultiple(parseTaskQueue) {
            var _this = this;

            var bytes = [];

            parseTaskQueue.tasks.forEach(function (task) {
                bytes = bytes.concat(_this.singleValueParser.numberToBytes(task.target, task.value));
            });

            return bytes;
        }
    }]);

    return MultiValueParser;
}();

MultiValueParser.ParseTaskQueue = function () {
    function _class(maxBytes) {
        _classCallCheck(this, _class);

        this.totalBytesUsed = 0;
        this.maximumBytes = maxBytes;
        this.tasks = [];
    }

    _createClass(_class, [{
        key: "addParseTask",
        value: function addParseTask(targetPrimitive, value) {

            if (targetPrimitive.bytes + this.totalBytesUsed > this.maximumBytes) {
                throw new Error("Maximum bytes count for builder exceeded");
            }

            this.totalBytesUsed += targetPrimitive.bytes;
            this.tasks.push({"target": targetPrimitive, "value": value});
        }
    }]);

    return _class;
}();

module.exports = MultiValueParser;