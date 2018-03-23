"use strict";

var Validator = require('../util/validator');
var SingleValueParser = require('./single-value-parser');

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

        if (singleValueParser == null ||
            SingleValueParser.name !== singleValueParser.constructor.name) {
            throw new Error("Invalid parameter. Expects SingleValueParser");
        }

        this.singleValueParser = singleValueParser;
    }

    _createClass(MultiValueParser, [{
        key: "parseMultiple",
        value: function parseMultiple(parseTaskQueue) {
            var _this = this;

            var bytes = [];

            parseTaskQueue.tasks.forEach(function (task) {
                bytes = bytes.concat(
                    _this.singleValueParser
                        .numberToBytes(task.target, task.value)
                );
            });

            if (parseTaskQueue.padZeros &&
                bytes.length < parseTaskQueue.maximumBytes) {
                let offset = parseTaskQueue.maximumBytes - bytes.length;
                for (let i = 0; i < offset; i++) {
                    bytes.push(0);
                }
            }
            return bytes;
        }
    }]);

    return MultiValueParser;
}();

MultiValueParser.ParseTaskQueue = function () {
    function _class(maxBytes) {
        _classCallCheck(this, _class);

        this.padZeros = true;
        this.totalBytesUsed = 0;
        this.maximumBytes = maxBytes;
        this.tasks = [];
    }

    _createClass(_class, [{
        key: "addParseTask",
        value: function addParseTask(targetPrimitive, value) {

            if (targetPrimitive.bytes + this.totalBytesUsed > this.maximumBytes) {
                throw new Error("Configured package byte size (" + this.maximumBytes + ")  exceeded.");
            }

            this.totalBytesUsed += targetPrimitive.bytes;
            this.tasks.push({ "target": targetPrimitive, "value": value });
        }
    }, {
        key: "padZeros",
        value: function padZeros(ifPad) {

            if (typeof ifPad !== "boolean") {
                throw new Error("Invalid parameter. Expected boolean.");
            }

            this.padZeros = ifPad;
        }
    }]);

    return _class;
}();

module.exports = MultiValueParser;