/* components/presentation.js
*  - various custom components
*  - presentational
*/

//code from Hayward gitlab

import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Image, Text, TouchableHighlight, View } from 'react-native';
//import { FLICKR_API_KEY } from '@env';
// import logic for api services - ./services/api.js
import { getJSON, getLocalJSON } from '../services/api.js';
// import utility funtions
import { buildPhotoUrl, formatCards } from '../utility/formatting.js';
//import { NavButton } from '../components/structure.js';

// import local styles
//import photoStyles from '../styles.js';


//const flickrApiURL = `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=719833438dd1801343c38a336ddecd9a&gallery_id=72157723344285268&format=json&nojsoncallback=1`;

//camera roll
const flickrApiURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=719833438dd1801343c38a336ddecd9a&user_id=201776761@N04&extras=url_m&format=json&nojsoncallback=1`;

//const artists = getLocalJSON('artists');

// define photo view for images from api
// - use return json data to get images &c.
// - create view and each image view in FlatList
class PhotoView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      pending: true, 
      artists: null,
    };
  }

  /*async fetchArtistData(id) {
    const artist = artists.find(artist => artist.imageID === id);
    if (artist) {
      this.setState({ artistData: artist });
    } else {
      console.log("No artist data found for image ID:", id);
      this.setState({ artistData: null });
    }
  } */

loadPhotoRoute(id) {
  console.log("Selected Image ID:", id);
  this.props.photoRoute(id);
  //this.fetchArtistData(id);
}

 async getPhotos() {
    try {
      const res = await getJSON(flickrApiURL);
      console.log(res);
      this.setState({ data: res.photos });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ pending: false });
    }
  }

  componentDidMount() {
    this.getPhotos();
  } 



  render() {
    const { data, pending } = this.state;
    // cropped square from flickr api 
    // - https://www.flickr.com/services/api/misc.urls.html
		const size = 'q'; 

    return (
      <View style={photoStyles.photosView}>
        {pending ? <ActivityIndicator/> : (
          <FlatList
            data={data.photo}
            keyExtractor={({ id }, index) => id}
            numColumns={2}
            renderItem={({ item }) => (
							<View style={photoStyles.photoCard}>
             		  <Image source={{uri: buildPhotoUrl(item, size)}} 
                         style={photoStyles.imgThumb} />
                                  
             <TouchableHighlight
               onPress={() => this.loadPhotoRoute(item.id)}>
               <Text>{item.title}</Text>
             </TouchableHighlight>
 
                  </View>
            )}
          />
        )}
      </View>
    );
  }
  
}

// single photo viewer for photo screen...
class PhotoViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgData: [],
      pending: true
    };
}

  itemApiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=719833438dd1801343c38a336ddecd9a&photo_id=${this.props.imageID}&format=json&nojsoncallback=1`;

  async getPhoto() {
    try {
      console.log(this.itemApiUrl);
      const res = await getJSON(this.itemApiUrl);
      console.log(res);
      this.setState({imgData: res.photo});
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({pending: false });
    } 
  }

  componentDidMount() {
    this.getPhoto();
  }

  render() {
    const { imgData, pending } = this.state;
    // testing size set to public 'large' - 1024...
    const size = 'b'; 

    return (
      <View style={photoStyles.photoView}>
        {pending ? <ActivityIndicator/> : (
          <View>
            <Text>Media: {imgData.media}</Text>
            <Image source={{uri: buildPhotoUrl(imgData, size)}}
                 style={photoStyles.imgFull} />
          </View>
        )}
      </View>
    );
  }

}
const photoStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		backgroundColor: '#BBBBBB'
	},
	heading: {
		flex: 1,
		alignItems: 'center',
		marginTop: 1,
		marginBottom: 4,
		padding: 10,
		backgroundColor: '#333444',
	},
	content: {
		flex: 7,
		marginTop: 0,
		marginBottom: 4,
		padding: 15,
		backgroundColor: '#DDDFFF',
	},
  cardView: {
		marginTop: 10,
	},
	card: {
		margin: 10,
		padding: 10,
    borderWidth: 1,
    //borderColor: '#BBBBBB',
    backgroundColor: '#EEEEEE',
    color: '#222222',
	},
  photosView: {
    flex: 1,
  },
  photoCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
    //borderWidth: 1,
  },
  photoCardMeta: {
    width: 0,
    flexGrow: 1,
    flex: 1,
  },
  photoCardTitle: {
    margin: 5,
    fontSize: 13,
    color: '#81A69B',
    //borderWidth: 1,
  },
  photoCardText: {
    margin: 5,
    fontSize: 11,
    borderWidth: 1,
  },
  imgThumb: {
    width: 150,
    height: 150,
  },
  imgFull: {
    width: 500,
    height: 500,
  },
	headingText: {
		color: '#DDDDDD',
		fontSize: 26,
    fontWeight: '300',
	},
	contentText: {
		color: '#333444',
		fontSize: 15,
		fontWeight: '300',
	},
  buttonBox: {
		margin: 30,
		padding: 5,
	},
  textLink: {
    margin: 5,
    padding: 5,
    color: 'blue',
  },
  cardTitle: {
		paddingBottom: 5,
		color: '#4F5173',
    fontSize: 16,
	},
	cardContent: {
		fontSize: 12,
  },
  artistInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  artistName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  artistBio: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
});

export { PhotoView, PhotoViewer };
