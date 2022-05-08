import {
  StyleSheet,
  View,
  Pressable,
  Text,
} from 'react-native';
import React from 'react';

const GetCatButton = ({getRandomCat}) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => getRandomCat()}
        title="Get a random cat image">
        <Text style={styles.text}>Get a random cat image !</Text>
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

export default GetCatButton;
