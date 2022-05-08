import React, {useState, useEffect} from 'react';

import {SafeAreaView, StyleSheet} from 'react-native';

import SQLite from 'react-native-sqlite-storage';

import HeaderComponent from './components/Header';
import SearchBar from './components/SearchBar';
import ImageComponent from './components/Image';
import GetCatButton from './components/GetCatButton';
import GoToCollectionButton from './components/GoToCollectionButton';
import CollectionPage from './components/CollectionPage';

const db = SQLite.openDatabase(
  // creating a database
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => console.log(error),
);

const createTable = () => {
  // creating table
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS cats (ID INTEGER PRIMARY KEY AUTOINCREMENT, ImageURL TEXT UNIQUE, Reaction TEXT)',
    );
  });
};

const App = () => {
  const [searchString, setSearchString] = useState('');
  const [imageURL, setImageURL] = useState(
    'https://cdn2.thecatapi.com/images/O3Iw_6kYG.jpg',
  );
  const [breeds, setBreeds] = useState({});
  const [page, setPage] = useState('main');

  // states representing the states of the app

  const getRandomCat = () => {
    setImageURL('');
    if (searchString && breeds[searchString.toLowerCase()]) {
      // if we have a valid search string then we are going to get a cat of a certain breed
      fetch(
        'https://api.thecatapi.com/v1/images/search?breed_ids=' +
          breeds[searchString.toLowerCase()],
      )
        .then(response => response.json())
        .then(json => {
          setImageURL(json[0].url);
        })
        .catch(error => console.error(error));
    } else {
      // otherwise just a random catto
      fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json())
        .then(json => setImageURL(json[0].url))
        .catch(error => console.error(error));
    }
  };

  const getBreeds = () => {
    // this will get us all the breeds and will be placed into the 'breeds' state
    fetch('https://api.thecatapi.com/v1/breeds')
      .then(response => response.json())
      .then(json => {
        const fetchedBreeds = {};
        json.forEach(breed => {
          fetchedBreeds[breed.name.toLowerCase()] = breed.id;
        });
        setBreeds(fetchedBreeds);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    getBreeds();
    getRandomCat();
    createTable();
  }, []); // execute this after the component first mounts

  if (page === 'collection') {
    // conditional rendering to display the collection page.
    return (
      <CollectionPage
        db={db}
        goBack={() => {
          setPage('main');
          getRandomCat();
        }}
      />
    );
  }

  return (
    // the main page
    <SafeAreaView style={styles.container}>
      <HeaderComponent />
      <SearchBar
        error={!breeds[searchString.toLowerCase()]}
        searchString={searchString}
        setSearchString={setSearchString}
      />
      <ImageComponent imageURL={imageURL} db={db} />
      <GetCatButton getRandomCat={getRandomCat} />
      <GoToCollectionButton
        goToCollection={() => {
          setPage('collection');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
