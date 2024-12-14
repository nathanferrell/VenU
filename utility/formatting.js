//Hayward Gitlab

import React from 'react';
import { Text, View } from 'react-native';

// import local styles
import photoStyles from '../styles.js';

/* helper functions
*  - format JSON data for cards rendering
*/
function formatCards(data) {
	// get cards array
	const cardData = data.cards;
	const cards = [];

		// format card per item in return object
		for (item of cardData) {
      // structure card with required JSX, styles &c.
      // - key added for react native lists usage...
			const card = 
      	<View style={ photoStyles.card } key={ item.id }>
					<Text style={photoStyles.cardTitle}>{ item.title } </Text>	
					<Text style={p	.cardContent}>{ item.card } </Text>
     		 </View>;	
			cards.push(card);
 		}

	// return array for structured item cards 	
	return cards;
}

// build url for flickr photo
// - server, id, secret, size per item in api json
function buildPhotoUrl(item, size) {
  // flickr api - image url structure
	//  - https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg
  const photoUrl = 'https://live.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_' + size + '.jpg';

	return photoUrl;
}


export { buildPhotoUrl, formatCards };
