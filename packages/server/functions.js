"use strict";
exports.__esModule = true;
exports.slice = exports.toConnectionType = exports.toConnection = void 0;
var A = require("fp-ts/lib/Array");
var O = require("fp-ts/lib/Option");
var pipeable_1 = require("fp-ts/lib/pipeable");
function toConnection(as, size) {
    var sliced = as.slice(0, size);
    var edges = sliced.map(function (a) { return ({ cursor: a.id, node: a }); });
    var endCursor = pipeable_1.pipe(A.last(edges), O.map(function (a) { return a.cursor; }), O.toUndefined);
    var hasNextPage = size < as.length;
    var pageInfo = {
        endCursor: endCursor,
        hasNextPage: hasNextPage
    };
    return { edges: edges, pageInfo: pageInfo };
}
exports.toConnection = toConnection;
function toConnectionType(as, size) {
    var sliced = as.slice(0, size);
    var edges = sliced.map(function (a) { return ({ cursor: a.id, node: a }); });
    return { edges: edges };
}
exports.toConnectionType = toConnectionType;
/**
 * Data-last version of Array.prototype.slice
 */
function slice(start, end) {
    return function (as) { return as.slice(start, end); };
}
exports.slice = slice;
