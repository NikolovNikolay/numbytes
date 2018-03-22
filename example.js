var Primitives = require('numbytes').Primitives;

console.log("INT32 min value:", Primitives.int32.min); // Outputs: "INT32 min value: -2147483648"
console.log("INT32 max value:", Primitives.int32.max); // Outputs: "INT32 max value: 2147483647"
console.log("INT32 bytes:", Primitives.int32.bytes); // Outputs: "INT32 bytes: 4"

/**
 * Outputs:
 *
 * INT32 min value: -2147483648
 * INT32 max value: 2147483647
 * INT32 bytes: 4
 */

var SingleValueParser = require('numbytes').SingleValueParser;
var singleValParserInst = new SingleValueParser();

var MultiValueParser = require('numbytes').MultiValueParser;
var multiValParserInst = new MultiValueParser(singleValParserInst); // Takes a SingleValueParser instance

const int32Bytes = singleValParserInst.numberToBytes(Primitives.int32, 1234);
console.log(int32Bytes);
/**
 * Outputs:
 *
 * [210, 4, 0, 0]
 */

var taskQueue = new MultiValueParser.ParseTaskQueue(13); // 13 is the overall bytes count
                                                         // that the parsed byte array should have
taskQueue.addParseTask(Primitives.int32, 928374);
taskQueue.addParseTask(Primitives.uint64, 1231231231343234354);
taskQueue.addParseTask(Primitives.uint8, 237);

var multiBytesArray = multiValParserInst.parseMultiple(taskQueue);
console.log(multiBytesArray);

/**
 * Outputs:
 *
 * [118, 42, 14, 0, 0, 141, 148, 20, 72, 54, 22, 17, 237]
 */