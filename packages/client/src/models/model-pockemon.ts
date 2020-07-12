export interface Pokemon {
	id: string;
	name: string;
	classification: string;
	types: string[]
}

export interface PokemonEdge {
	node: Pokemon
}

export interface PokemonResults {
	pokemons: Pokemon[],
	hasNextPage: boolean
}

export interface PokemonType {
	id: string;
	name: string;
}

export interface PokemonTypeEdge {
	node: PokemonType;
}

export interface PokemonTypeResults {
	types: PokemonType[];
}

export interface TypeColor {
	[index: string]: { rgb: string, rgba: string }
}
