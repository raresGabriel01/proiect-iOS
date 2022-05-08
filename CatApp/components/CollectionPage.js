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
  Image,
  Pressable,
  FlatList,
} from 'react-native';


const CollectionPage = ({goBack, db}) => {
    const [reactionPage, setReactionPage] = useState('all');
    const [myCats, setMyCats] = useState([])

    const deleteCat = (imageURL) => {
        db.transaction(async tx => {
          tx.executeSql("DELETE FROM cats WHERE ImageURL = ?", [imageURL])
        })
      }

    const getReactionCats = (reaction) => {
        db.transaction(async tx => {
          tx.executeSql("SELECT * FROM cats WHERE reaction = ?", [reaction], (tx, res) => {
              let newCats = [];
              for (let i = 0; i < res.rows.length; i++) {
                const cat = {
                    url: res.rows.item(i).ImageURL,
                    reaction: res.rows.item(i).Reaction
                  }
                  newCats.push(cat)
              }
              setMyCats(newCats)
          });
        })
      }
      
      const getAllCats =  () => {
        
         db.transaction(tx => {
           tx.executeSql("SELECT Reaction, ImageURL FROM cats",[], (tx, res) => {
            let newCats = [];
            for (let i =0 ; i < res.rows.length; i++) {
                
              const cat = {
                url: res.rows.item(i).ImageURL,
                reaction: res.rows.item(i).Reaction
              }
              newCats.push(cat)
            }
            // setTimeout(() => {
            //     setMyCats(newCats)
            // }, 1000)
            setMyCats(newCats)
          });
        })
        
      }


    useEffect(() => {
        getAllCats()
    },[])

    const renderCatImage = ({item}) => {
        return (
            <View style={styles.imageView}>
                <Image style={styles.image} source ={{uri: item.url}}/>
                <Pressable onPress={() => {
                    deleteCat(item.url);
                    setMyCats(myCats.filter(cat => cat.url !== item.url));
                }}> 
                    <Text> 
                        &#x274C; 
                    </Text> 
                </Pressable>
                
            </View>
            
        )
    }

    return (
        <SafeAreaView style={styles.container}>
                        <Pressable onPress={goBack} style={styles.button}>
                <Text style={styles.text}>
                    Go back
                </Text>
            </Pressable>
            <View style={styles.reactionWrapper}>
                <Pressable style={reactionPage === 'all' ? styles.pressedIcon : styles.icon} onPress={() => { getAllCats(); setReactionPage('all')}}>
                    <Text>
                        All
                    </Text>
                </Pressable>
                <Pressable style={reactionPage === 'laugh' ? styles.pressedIcon : styles.icon} onPress={() => {getReactionCats('laugh'); setReactionPage('laugh')}}>
                    <Text>
                        &#128516;
                    </Text>
                </Pressable>
                <Pressable style={reactionPage === 'heart' ? styles.pressedIcon : styles.icon} onPress={() => {getReactionCats('heart'); setReactionPage('heart')}}>
                    <Text>
                        &#128151;
                    </Text>
                </Pressable>
            </View>
            <FlatList
                
                data = {myCats}
                renderItem={renderCatImage}
                numColumns={2}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    reactionWrapper: {
        flexDirection: 'row',
    },
    icon: {
        margin: 10,
        borderColor: 'transparent',
        borderWidth: 2,
    },
    pressedIcon: {
        margin: 10,
        borderStyle: 'solid',
        borderColor: '#ff00ff',
        borderWidth: 2,
        borderRadius: 5,
    },
    content: {
        fontSize: 30,
    },
    button: {
        backgroundColor: "#ff00ff",
        padding: 15
    },
    text: {
        color: "white",
        fontSize: 20,
        textAlign: 'center'
    },
    image: {
        width: 150,
        height: 150,
        margin: 10
    },
    imageView: {
        flex: 1,
        flexDirection:'column',
        alignContent: 'space-around',
        justifyContent: 'space-around',
        alignItems: 'center',
    }

})


export default CollectionPage;