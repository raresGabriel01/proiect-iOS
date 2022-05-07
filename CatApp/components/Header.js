
import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


const Header = () => {
    return (
        <SafeAreaView style={styles.header}>
            <Text style={styles.title}>Cat-Mania</Text>
            <Text style={styles.subtitle}>Your daily dose of cats</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FF00FF',
        flex: 0.2,
        justifyContent: 'center'
    },
    title: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center'
    },
    subtitle: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center' 
    }
})

export default Header;