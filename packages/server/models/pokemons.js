"use strict";
exports.__esModule = true;
exports.getAllTypes = exports.filterByType = exports.query = void 0;
var pipeable_1 = require("fp-ts/lib/pipeable");
var O = require("fp-ts/lib/Option");
var A = require("fp-ts/lib/Array");
var function_1 = require("fp-ts/lib/function");
var pokemons_1 = require("../data/pokemons");
var functions_1 = require("../functions");
var SIZE = 10;
function query(args) {
    var after = args.after, q = args.q, _a = args.limit, limit = _a === void 0 ? SIZE : _a;
    var filterByQ = 
    // filterType only if q is defined
    q === undefined
        ? function_1.identity
        : A.filter(function (p) { return p.name.toLowerCase().includes(q.toLowerCase()); });
    var sliceByAfter = 
    // filterType only if q is defined
    after === undefined
        ? function_1.identity
        : function (as) {
            return pipeable_1.pipe(as, A.findIndex(function (a) { return a.id === after; }), O.map(function (a) { return a + 1; }), O.fold(function () { return as; }, function (idx) { return as.slice(idx); }));
        };
    var results = pipeable_1.pipe(pokemons_1.data, filterByQ, sliceByAfter, 
    // slicing limit + 1 because the `toConnection` function should known the connection size to determine if there are more results
    functions_1.slice(0, limit + 1));
    return functions_1.toConnection(results, limit);
}
exports.query = query;
function filterByType(args) {
    var type = args.type, after = args.after, _a = args.limit, limit = _a === void 0 ? SIZE : _a;
    console.log("Filtering by type", type, after, limit);
    var filterByType = type === undefined
        ? function_1.identity
        : A.filter(function (pokemon) { return !!pokemon.types.find(function (item) { return type.toLowerCase() === item.toLowerCase(); }); });
    var filterByAfter = after === undefined
        ? function_1.identity
        : function (list) {
            return pipeable_1.pipe(list, A.findIndex(function (a) { return a.id === after; }), O.map(function (a) { return a + 1; }), O.fold(function () { return list; }, function (idx) { return list.slice(idx); }));
        };
    var results = pipeable_1.pipe(pokemons_1.data, filterByType, filterByAfter, functions_1.slice(0, limit + 1));
    return functions_1.toConnection(results, limit);
}
exports.filterByType = filterByType;
function getAllTypes(args) {
    var type = args.type;
    console.log("Getting all types", type);
    var getTypes = type === undefined
        ? function_1.identity
        : A.filter(function (pokemon) { return !!pokemon.types.find(function (item) { return type.toLowerCase() === item.toLowerCase(); }); });
    var prepareList = function (list) { return pipeable_1.pipe(list, function (A) { return A.flatMap(function (item) { return item.types; }); }, function (A) { return Array.from(new Set(A)); }); };
    var results = pipeable_1.pipe(pokemons_1.data, getTypes, prepareList, function (A) { return A.map(function (item, index) {
        return {
            id: ('00' + index).substr(-3),
            name: item
        };
    }); });
    // const types: string[] = data.flatMap(item => item.types);
    // const uniqueTypes: string[] = Array.from(new Set(types));
    // const results: PokemonType[] = uniqueTypes.map((item, index) => {
    // 	return {
    // 		id: ('00' + index).substr(-3),
    // 		name: item
    // 	}
    // });
    // debugger;
    return functions_1.toConnectionType(results, results.length + 1);
}
exports.getAllTypes = getAllTypes;
