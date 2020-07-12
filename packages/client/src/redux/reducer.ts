import {combineReducers} from "redux";
import {FILTER, LOAD_MORE, SEARCH} from "./actions";

const initialSearchState = {
	value: ''
}

const initialFilterState = {
	value: 'name'
}

const initialLoadMoreState = {
	value: ''
}

const searchReducer = (state = initialSearchState, action: any) => {
	if (action.type === SEARCH) {
		console.log("Reducer searchReducer", state, action);
		state.value = action.data;
	}
	return state;
}

const filterReducer = (state = initialFilterState, action: any) => {
	if (action.type === FILTER) {
		console.log("Reducer filterReducer", state, action);
		state.value = action.data;
	}
	return state;
}

const loadMoreReducer = (state = initialLoadMoreState, action: any) => {
	if (action.type === LOAD_MORE) {
		console.log("Reducer searchReducer", state, action);
		state.value = action.data
	}
	return state;
}

const allReducers = combineReducers({searchReducer, filterReducer, loadMoreReducer});
export default allReducers;
