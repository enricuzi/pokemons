import {SimpleAction} from "../models/model-redux";

export const SEARCH = "SEARCH";
export const FILTER = "FILTER";
export const LOAD_MORE = "LOAD_MORE";

export const doSearch = (data: string): SimpleAction => {
	console.log("Action doSearch", data);
	return {
		type: SEARCH,
		data
	}
}

export const changeFilter = (data: string): SimpleAction => {
	console.log("Action changeFilter", data);
	return {
		type: FILTER,
		data
	}
}

export const loadMore = (data: string): SimpleAction => {
	console.log("Action loadMore", data);
	return {
		type: LOAD_MORE,
		data
	}
}
