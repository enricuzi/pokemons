import {pipe} from "fp-ts/lib/pipeable";
import * as O from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";
import {identity} from "fp-ts/lib/function";
import {data} from "../data/pokemons";
import {toConnection, slice, toConnectionType} from "../functions";
import {Connection, ConnectionType} from "../types";

interface Pokemon {
	id: string;
	name: string;
	classification: string;
	types: string[];
}

interface PokemonType {
	id: string;
	name: string;
}

const SIZE = 10;

export function query(args: {
	after?: string;
	limit?: number;
	q?: string;
}): Connection<Pokemon> {
	const {after, q, limit = SIZE} = args;

	const filterByQ: (as: Pokemon[]) => Pokemon[] =
		// filterType only if q is defined
		q === undefined
			? identity
			: A.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

	const sliceByAfter: (as: Pokemon[]) => Pokemon[] =
		// filterType only if q is defined
		after === undefined
			? identity
			: as =>
				pipe(
					as,
					A.findIndex(a => a.id === after),
					O.map(a => a + 1),
					O.fold(() => as, idx => as.slice(idx))
				);

	const results: Pokemon[] = pipe(
		data,
		filterByQ,
		sliceByAfter,
		// slicing limit + 1 because the `toConnection` function should known the connection size to determine if there are more results
		slice(0, limit + 1)
	);
	return toConnection(results, limit);
}

export function filterByType(args: { type?: string, after?: string, limit?: number }): Connection<Pokemon> {
	const {type, after, limit = SIZE} = args;
	console.log("Filtering by type", type, after, limit);

	// Check if type is set to filter data, otherwise return all data
	const filterByType: (list: Pokemon[]) => Pokemon[] =
		type === undefined
			? identity
			: A.filter(pokemon => !!pokemon.types.find(item => type.toLowerCase() === item.toLowerCase()));

	// Check if data has to be paged
	const filterByAfter: (list: Pokemon[]) => Pokemon[] =
		after === undefined
			? identity
			: list =>
				pipe(
					list,
					A.findIndex(a => a.id === after),
					O.map(a => a + 1),
					O.fold(() => list, idx => list.slice(idx))
				);

	// Apply transformations to get requested data
	const results: Pokemon[] = pipe(
		data,
		filterByType,
		filterByAfter,
		slice(0, limit + 1)
	);
	return toConnection(results, limit);
}

export function getAllTypes(args: { type?: string }): ConnectionType<PokemonType> {
	const {type} = args;
	console.log("Getting all types", type);

	// Check if type is set to filter data, otherwise return all data
	const getTypes: (list: Pokemon[]) => Pokemon[] =
		type === undefined
			? identity
			: A.filter(pokemon => !!pokemon.types.find(item => type.toLowerCase() === item.toLowerCase()));

	// Extract all data types and put in a set with no duplicates
	const prepareList: (list: Pokemon[]) => string[] =
		list => pipe(
			list,
			A => A.flatMap(item => item.types),
			A => Array.from(new Set(A))
		);

	// Apply transformations to get PokemonType list
	const results: PokemonType[] = pipe(
		data,
		getTypes,
		prepareList,
		A => A.map((item: string, index: number) => {
			return {
				id: ('00' + index).substr(-3),
				name: item
			}
		})
	);
	return toConnectionType(results, results.length + 1);
}
