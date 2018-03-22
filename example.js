const Primitives = require('./app/util/primitives');

const SingleValueParser = require('./app/parser/single-value-parser');
const MultiValueParser = require('./app/parser/multi-value-parser');

const singleValParser = new SingleValueParser();

const singleValueBytes = singleValParser.numberToBytes(Primitives.int32, 1234);
console.log(singleValueBytes);

const multiValueParser = new MultiValueParser(singleValParser);

const taskQueue = new MultiValueParser.ParseTaskQueue(13);
taskQueue.addParseTask(Primitives.int32, 928374);
taskQueue.addParseTask(Primitives.uint64, 1231231231343234354);
taskQueue.addParseTask(Primitives.uint8, 237);

const multipleValueBytes = multiValueParser.parseMultiple(taskQueue);
console.log(multipleValueBytes);