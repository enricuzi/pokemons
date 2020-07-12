# React Pokemons

Search pokemon data optionally filtering by name or type.

By default, the page loads all the pokemons paging the data 10 by 10.

Select a filter criteria:
- Name: to show input text and search pokemons by name
- Type: to show the list of all pokemon types to filter

# Client package

### Responsive Layout

The frontend layout is designed around a responsive grid based on screen width

The header of the page controls the search criteria.

The body of the page handles the data list.

Each card changes its background color based on which and how many types the item has.

### Client components

- App: 
    - Centralize the backend requests to the get data.
    - Controls the rendering of the data list
    - Responds to broadcasted events to load more and filter data.
    
- ListComponent:
    - Handles the responsive grid layout.
    
- ItemComponent:
    - Holds the single card layout and pokemon data.
    
- LoadMoreComponent:
    - Broadcasts load more requests.
    
- SearchComponent:
    - Broadcasts selected filter criteria.
    
### Client models

- Colors:
    - Defines a color for each pokemon type.
    
- Pokemon:
    - Defines object interfaces to use across the project.
    
- Redux:
    - Defines object interfaces to use with redux broadcasting.
    
### Redux

Defines actions and reducers to handle react redux. 

### Services

Centralizes data requests with Apollo GraphQL.

# Server package

## Models

- Query
    - Filters data by name.
    
- FilterByType
    - Filters data by a type.

- GetAllTypes
    - Returns a unique set of all types.
    
## Functions

- ToConnection
    - Handles paged pokemon data.
    
- ToConnectionType
    - Handles pokemon type list.

## Resolvers

- Pokemons
    - Returns filtered pokemons by name.

- PokemonsByType
    - Returns filtered pokemons by type.

- pokemonTypes
    - Returns all pokemon type list.

## How to install

Execute `yarn install` from root folder

### Start server

Execute `yarn start` from /packages/server

### Start client

Execute `yarn start` from /packages/client
