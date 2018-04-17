import React from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';

import styles from '../styles/styles'

export default QuestionView = ({question,toggleFavoriteQuestion,remove,skip,isFavorite,skips}) =>

    <View style={localStyles.cardContainer}>

        <Text style={[{
            color: '#8CF5E7',
            fontSize: 30,
        },  styles.expTextView, ]}>You didn't read the rules, did you?</Text>
        <Text style={[{
            color: '#8CF5E7',
            fontSize: 30,
        },  styles.expTextView, ]}>If not, tap</Text>
        <Image source={require('../../assets/icons/info-howtoplay.png')} /><Text style={[{
        color: '#8CF5E7',
        fontSize: 30,
    },  styles.expTextView, ]}>for rules info</Text>

    </View>

const localStyles = StyleSheet.create({
    tncText: {
        color: "black",
        fontSize: 16,
        marginTop: 16,
        fontFamily: 'Quicksand-Bold',
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#000"
    },
    container: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardButton: {
        // borderRadius: 4,
        // borderWidth: 0.5,
        // borderColor: '#d6d7da',
        padding: 5,
    },

    cardContainer: {
        backgroundColor: 'white',
        width: '94%',
        borderRadius: 6,
        shadowOffset: {width: -0.5, height: 0.5},
        shadowColor: 'black',
        shadowOpacity: 0.85,
        shadowRadius: 1,
        alignSelf: 'center',
        height: 360,
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 25,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'

    },

})



