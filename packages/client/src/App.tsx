import React, {useEffect, useState} from 'react';
import './App.css';
import SearchComponent from "./components/SearchComponent/SearchComponent";
import ListComponent from "./components/ListComponent/ListComponent";
import {Services} from "./Services";
import {Pokemon, PokemonType} from "./models/model-pockemon";
import {useSelector} from "react-redux";
import LoadMoreComponent from "./components/LoadModeComponent/LoadMoreComponent";
import {Layout} from "antd";
import {FilterReducer, LoadMoreReducer, SearchReducer} from "./models/model-redux";

const {Header, Content} = Layout;

function App() {
	// Pokemon list handler
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);

	// Pokemon type list handler
	const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([]);

	// Handler to show or hide the loadMore button
	const [loadMore, setLoadMore] = useState(true);

	// Handler to store last loaded id
	const [lastItem, setLastItem] = useState("000");

	// Store all current displayed data
	let displayedPokemons: Pokemon[] = pokemons;

	const fetchData = (value: string, lastItem: string, filter?: string) => {
		console.log(`App fetching data { value: ${value}, lastItem: ${lastItem}, filter: ${filter} }`);

		// Get paged data
		Services.getData(value, lastItem, filter).then(data => {
			console.log(data);

			// Update displayed data
			setPokemons([...displayedPokemons, ...data.pokemons]);

			// Update loadMore status button
			setLoadMore(data.hasNextPage);

			// Update last paged data
			setLastItem(data.pokemons.length
				? data.pokemons[data.pokemons.length - 1].id
				: '000')
		});

		// Get all pokemon types
		Services.getPokemonTypes().then(data => {
			console.log(`App getPokemonTypes: ${data}`);

			// Update displayed types
			setPokemonTypes(data.types);
		})
	}

	// Handler for search event
	const searchValue = useSelector((state: SearchReducer) => {
		console.log("App useSelector searchReducer", state.searchReducer.value);
		return state.searchReducer.value
	});

	// Handler for filter event
	const filterValue = useSelector((state: FilterReducer) => {
		console.log("App useSelector filterReducer", state.filterReducer.value);
		return state.filterReducer.value
	});

	// Handler for loadMore event
	const loadMoreItem = useSelector((state: LoadMoreReducer) => {
		console.log("App useSelector loadMoreReducer", state);
		return state.loadMoreReducer.value
	});

	// Update UI when a search or filter changed
	useEffect(() => {
		console.log(`App useEffect searchValue {searchValue: ${searchValue}, lastItem: ${lastItem}, loadMoreItem: ${loadMoreItem}}`);
		displayedPokemons = [];
		fetchData(searchValue, '000', filterValue);
	}, [searchValue, filterValue]);

	// Update UI when a loadMore event is triggered
	useEffect(() => {
		console.log(`App useEffect loadMore {searchValue: ${searchValue}, lastItem: ${lastItem}, loadMoreItem: ${loadMoreItem}}`);
		setLoadMore(false);
		fetchData(searchValue, lastItem, filterValue);
	}, [loadMoreItem])

	console.log(`App { displayedPokemons: ${displayedPokemons} }`)

	return (
		<>
			<Layout>
				<Header>
					<SearchComponent pokemonTypes={pokemonTypes}/>
				</Header>
				<Content>
					<ListComponent data={pokemons}/>
					<LoadMoreComponent showLoadMore={loadMore} lastItem={lastItem}/>
				</Content>
			</Layout>
		</>
	);
}

export default App;
