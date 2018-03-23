# numbytes v1.0.4

Node.js package providing functionality for parsing javascript number(s) to unsigned bytes, filled in an array.

## Installation
Using npm:  

    npm install numbytes --save

## Usage in Node

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
    
    // With the current configuration the task queue accepts exactly 13 bytes.
    // Attempting to add more values to parse will throw an Error.
    // An error will be thrown as well as if an invalid value is passed for
    // a primitive type, e.g:
    //      let value = 1000;
    //      taskQueue.addParseTask(Primitives.uint8, value);
    //      0 <= value <= 255
    
    
    taskQueue.padZeros(true); // This is optional, by default is set to true. If there are parse 
                              // tasks for primitives less than 13 bytes, the result array will be
                              // filled with zeros for the remaining slots.
                            
    var multiBytesArray = multiValParserInst.parseMultiple(taskQueue);
    console.log(multiBytesArray);
    
     /**
      * Outputs:
      *
      * [118, 42, 14, 0, 0, 141, 148, 20, 72, 54, 22, 17, 237]
      */
    
[Package source](https://github.com/NikolovNikolay/numbytes "GitHub Repository")