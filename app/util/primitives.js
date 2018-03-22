"use strict";

function primitiveGen(min, max, bytesCount) {
    return {
        "min": min,
        "max": max,
        "bytes": bytesCount
    };
}

const primitives = {};

Object.defineProperty(primitives, 'int8', {
    get: function () {
        return primitiveGen(-128, 127, 1);
    }
});

Object.defineProperty(primitives, 'uint8', {
    get: function () {
        return primitiveGen(0, 255, 1);
    }
});

Object.defineProperty(primitives, 'int16', {
    get: function () {
        return primitiveGen(-32768, 32767, 2);
    }
});

Object.defineProperty(primitives, 'uint16', {
    get: function () {
        return primitiveGen(-32768, 32767, 2);
    }
});

Object.defineProperty(primitives, 'int32', {
    get: function () {
        return primitiveGen(-2147483648, 2147483647, 4);
    }
});

Object.defineProperty(primitives, 'uint32', {
    get: function () {
        return primitiveGen(0, 4294967295, 4);
    }
});

Object.defineProperty(primitives, 'int64', {
    get: function () {
        return primitiveGen(-9223372036854775808, 9223372036854775807, 8);
    }
});

Object.defineProperty(primitives, 'uint64', {
    get: function () {
        return primitiveGen(0, 18446744073709551615, 8);
    }
});

module.exports = primitives;