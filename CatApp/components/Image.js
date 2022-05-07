import {TextInput, StyleSheet, View, Image, SafeAreaView, Text, Pressable} from 'react-native';
import React, { useState, useEffect } from 'react';

const ImageComponent = ({imageURL}) => {
    const [reaction, setReaction] = useState('');
    const [imageLink, setImageLink] = useState(imageURL);
    
    useEffect(() => {
        setImageLink(imageURL);
        setReaction('');
    }, [imageURL])

    const handlePress = (reactionType) => () => {
        if (reaction === reactionType) {
            setReaction('');
        } else {
            setReaction(reactionType);
        }

    }

    return (
        <View style={styles.container}>
                  <Image
                style={styles.image}
        source={{
          uri: imageLink,
        }} />
            <View style={styles.reactionWrapper}>
                
                <Pressable style={ reaction === 'laugh' ? styles.pressedIcon :styles.icon} onPress={handlePress('laugh')}>
                    <Text style={styles.emoji}>
                        &#128516;
                    </Text>
                </Pressable>
                

                <Pressable style={reaction === 'heart' ? styles.pressedIcon :styles.icon} onPress={handlePress('heart')}>
                    <Text style={styles.emoji}>
                        &#128151;
                    </Text>
                </Pressable>

            </View>

        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.4,
       justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 250,
        height: 250,
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
    emoji: {
        fontSize: 30,
    }

})

export default ImageComponent;