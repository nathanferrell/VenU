/* services/api.js
*  - async tests 
*  - api config
*/

//Hayward Gitlab

// test async usage - fetch json file
// - url for query
// - parse json to js object
function getJSON(url) {
	return fetch(url, {
		headers: new Headers({
			Accept: 'application/json'
		})
	})
	.then(res => res.json());
}

// query local json file - return data object
function getLocalJSON(file) {

  // define static paths for known local json files
	const localFiles = {
		artists: require('../data/artists.json'),
		concerts: require('../data/concerts.json'),
		upcomingConcerts: require('../data/upcomingconcerts.json'),
		venues: require('../data/venues.json'),
	
	}

	const data = localFiles[file]; 

	return data;
}

export { getJSON, getLocalJSON }; 
