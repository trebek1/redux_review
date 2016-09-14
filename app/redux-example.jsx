var redux = require('redux');

console.log('Starting redux example');

// Pure Function 
	// given same inputs always returning same values 
	// does not rely on variables defined above 
	// does not  change any values outside of itself
	// no asyncronous requests (promises or callbacks)


// store takes one argument, the reducer
	// reducer must be pure function 
	// takes old state and changes and calculates new state 

// reducer must statisfy 2 conditions 
	// have a default state for when the app is getting started 
	// must return state even if there is no action 

var stateDefault = {
	name: 'alex',
	hobbies: [],
	movies: []
}

var nextMovieId = 1; 
var nextHobbyId = 1; 

var reducer = (state = stateDefault,action) => {
	// state passed in or default if none 
	//state = state || {name: "alex"};

	switch(action.type){
		case 'CHANGE_NAME':
			return {
				...state,
				name: action.name
			}
		case 'ADD_MOVIE':
			return{
				...state,
				movies: [...state.movies, {id: nextMovieId++, title: action.title, genre: action.genre}]
			}
		case 'ADD_HOBBY':
			return{
				...state,
				hobbies: [...state.hobbies, {id: nextHobbyId++, name: action.name}]
			}
		case "REMOVE_HOBBY":
			return{
				...state, 
				hobbies: state.hobbies.filter((hobby) => hobby.id !== action.id)
					//filter only keeps item in array if true 


				
			}
		default: 
			return state;
	}
}

var store = redux.createStore(reducer, redux.compose(
	window.devToolsExtension ? window.devToolsExtension() : f => f 
	)); 

// Subscribe to changes 
var unsubscribe = store.subscribe(() => {
	var state = store.getState();

	console.log("Name is ", state);
	document.getElementById('app').innerHTML = state.name; 

});

var currentState = store.getState(); 
console.log("current State is ", currentState);

var action = {
	type: 'CHANGE_NAME',
	name: 'Tom'
}

store.dispatch(action);

//unsubscribe();

store.dispatch({
	type: 'CHANGE_NAME',
	name: 'emily'
})

store.dispatch({
	type: 'ADD_MOVIE',
	title: 'Italian Job',
	genre: 'Action'
})

store.dispatch({
	type: 'ADD_HOBBY',
	name: 'tennis'
})

store.dispatch({
	type: 'ADD_HOBBY',
	name: 'swimming'
})

store.dispatch({
	type: 'REMOVE_HOBBY',
	id: 1
})







