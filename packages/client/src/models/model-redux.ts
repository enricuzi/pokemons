export interface SimpleReducer {
	value: string;
}

export interface SimpleAction {
	type: string
	data: string
}

export interface SearchReducer {
	searchReducer: SimpleReducer
}

export interface FilterReducer {
	filterReducer: SimpleReducer
}

export interface LoadMoreReducer {
	loadMoreReducer: SimpleReducer
}
