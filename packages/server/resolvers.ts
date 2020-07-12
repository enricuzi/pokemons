import {IResolvers} from "graphql-tools";
import * as pokemons from "./models/pokemons";

export const resolvers: IResolvers = {
	Query: {
		pokemons: (_source, args) => pokemons.query(args),
		pokemonsByType: (_source, args) => pokemons.filterByType(args),
		pokemonTypes: (_source, args) => pokemons.getAllTypes(args)
	}
};
