import {Pokemon, PokemonEdge, PokemonResults, PokemonType, PokemonTypeEdge, PokemonTypeResults} from "./models/model-pockemon";
import {ApolloClient} from 'apollo-client';
import {InMemoryCache, NormalizedCacheObject} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {gql} from "apollo-boost";

const cache = new InMemoryCache();
const link = new HttpLink({
	uri: 'http://localhost:4000/'
});

/**
 * Initialize Apollo Client connection
 */
const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	cache,
	link
});

/**
 * Common query string to get a pokemon list
 */
const BASE_QUERY = `edges {
						node {
							id,
							name,
							classification,
							types,
						}
					},
					pageInfo {
						hasNextPage
					}`

/**
 * Query all pokemons by name
 */
const QUERY_POKEMONS = gql`
    query Pokemon($q: String, $after: ID) {
        pokemons(q: $q, after: $after) {
            ${BASE_QUERY}
        }
    }
`

/**
 * Query all pokemons by type
 */
const QUERY_POKEMONS_BY_TYPE = gql`
    query Pokemon($type: String!, $after: ID) {
        pokemonsByType(type: $type, after: $after) {
            ${BASE_QUERY}
        }
    }
`

/**
 * Query all pokemon types
 */
const QUERY_ALL_TYPES = gql`
    query PokemonType {
        pokemonTypes {
            edges {
                node {
                    name
                }
            }
        }
    }
`

export class Services {

	/**
	 * Get all pokemon types
	 */
	static getPokemonTypes(): Promise<PokemonTypeResults> {
		console.log("Service getPokemonTypes");
		return new Promise(resolve => {
			apolloClient.query({
				query: QUERY_ALL_TYPES
			})
			.then(result => {
				console.log(result);
				const {edges} = result.data.pokemonTypes;
				const types = edges.map((item: PokemonTypeEdge) => item.node as Pokemon);
				resolve({types});
			});
		})
	}

	/**
	 * Routes the correct method to requested data based on parameters
	 *
	 * @param value: string to filter by name or type
	 * @param after: string id to query paged data
	 * @param filter: string to switch from 'name' to 'type'
	 */
	static async getData(value: string, after: string, filter: string = 'name'): Promise<PokemonResults> {
		console.log(`Service getData { value: ${value}: after: ${after}, filter: ${filter} }`);
		if (!value) {
			// If no value passed then just get all paged data
			return await this.getAll(after);
		} else if (filter === 'name') {
			return await this.filterByName(value, after);
		} else {
			return await this.filterByType(value, after);
		}
	}

	/**
	 * Get all paged data with no filter
	 *
	 * @param after: string id to query paged data
	 */
	private static getAll(after: string): Promise<PokemonResults> {
		return new Promise(resolve => {
			apolloClient.query({
				query: QUERY_POKEMONS,
				variables: {
					after
				}
			})
			.then(result => {
				// Simulate server latency for testing purpose
				// setTimeout(() => this.returnPokemonData('pokemons', result, resolve), 1000)

				this.returnPokemonData('pokemons', result, resolve)
			});
		})
	}

	/**
	 * Get paged data filtered by name
	 *
	 * @param name: string to filter data by name
	 * @param after: string id to query paged data
	 */
	private static filterByName(name: string, after: string): Promise<PokemonResults> {
		console.log("Service filterByName", name, after);
		return new Promise(resolve => {
			apolloClient.query({
				query: QUERY_POKEMONS,
				variables: {
					q: name,
					after
				}
			})
			.then(result => {
				this.returnPokemonData('pokemons', result, resolve)
			});
		})
	}


	/**
	 * Get paged data filtered by name
	 *
	 * @param type: string to filter data by type
	 * @param after: string id to query paged data
	 */
	private static filterByType(type: string, after: string): Promise<PokemonResults> {
		console.log("Service filterByType", type, after);
		return new Promise(resolve => {
			apolloClient.query({
				query: QUERY_POKEMONS_BY_TYPE,
				variables: {
					type,
					after
				}
			})
			.then(result => {
				this.returnPokemonData('pokemonsByType', result, resolve)
			});
		})
	}

	/**
	 * Handler for queried data list
	 * @param key: string for data container
	 * @param response: object response container
	 * @param resolve: callback to close the promise
	 */
	private static returnPokemonData(key: string, response: any, resolve: any) {
		console.log(response);
		const {edges, pageInfo} = response.data[key];
		const {hasNextPage} = pageInfo;
		const pokemons = edges.map((item: PokemonEdge) => item.node as Pokemon);
		const data: PokemonResults = {
			pokemons,
			hasNextPage
		}
		resolve(data);
	}

}
