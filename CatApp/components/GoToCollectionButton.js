import {
  StyleSheet,
  View,
  Pressable,
  Text,
} from 'react-native';
import React from 'react';

const GoToCollectionButton = ({goToCollection}) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={goToCollection}
        title="Get a random cat image">
        <Text style={styles.text}>Go to your collection</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ff00ff',
    padding: 15,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default GoToCollectionButton;
