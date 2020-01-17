/*jshint esversion: 6 */
"use strict";

const schemaName = 'relay';

module.exports = function (mongoose) {
    var schema = mongoose.Schema(
        {
            switchName: {type: String},
            state: {type: Boolean}
        }
    );

    return mongoose.model(schemaName, schema);
};