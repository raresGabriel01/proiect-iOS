import {TextInput, StyleSheet, View, Text} from 'react-native';
import React from 'react';

const SearchBar = ({searchString, setSearchString, error}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={newText => {
          setSearchString(newText);
        }}
        defaultValue={searchString}
        placeholder="Think of a cat breed..."
      />
      <Text style={styles.error}>
        {error && searchString !== '' ? 'No such breed found !' : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: 'black',
  },
  container: {
    flex: 0.2,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  error: {
    color: 'red',
  },
});

export default SearchBar;
