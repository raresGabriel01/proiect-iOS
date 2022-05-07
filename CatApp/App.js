/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
} from 'react-native';


import HeaderComponent from './components/Header';
import SearchBar from './components/SearchBar';
import ImageComponent from './components/Image';
import GetCatButton from './components/GetCatButton';
import GoToCollectionButton from './components/GoToCollectionButton';

const App = () => {

  const [searchString, setSearchString] = useState('');
  const [imageURL, setImageURL] = useState('https://cdn2.thecatapi.com/images/O3Iw_6kYG.jpg');
  const [breeds, setBreeds] = useState({});
  const [page, setPage] = useState('main');

  const getRandomCat = () => {

    if (searchString && breeds[searchString.toLowerCase()]) {
      fetch('https://api.thecatapi.com/v1/images/search?breed_ids=' + breeds[searchString.toLowerCase()])
      .then((response) => response.json())
      .then((json) => {setImageURL(json[0].url)})
      .catch((error) => console.error(error))
    } else {
      fetch('https://api.thecatapi.com/v1/images/search')
      .then((response) => response.json())
      .then((json) => setImageURL(json[0].url))
      .catch((error) => console.error(error))
    }

  }

  const getBreeds = () => {
    fetch('https://api.thecatapi.com/v1/breeds')
    .then((response) => response.json())
    .then((json) => {
      const fetchedBreeds = {}
      json.forEach(breed => {
        fetchedBreeds[breed.name.toLowerCase()] = breed.id;
      });
      console.log(fetchedBreeds);
      setBreeds(fetchedBreeds);
    })
    .catch((error) => console.error(error))
  }

  useEffect( () => {
    getBreeds();
    getRandomCat();
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent />
      <SearchBar error={!breeds[searchString.toLowerCase()]} searchString={searchString} setSearchString={setSearchString} />
      <ImageComponent imageURL={imageURL}/>
      <GetCatButton getRandomCat={getRandomCat}/>
      <GoToCollectionButton goToCollection={() => {setPage('collection')}}/>
      

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
export default App;
