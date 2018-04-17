import React, {
    Component,
} from 'react';
import PropTypes from 'prop-types'
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';

import styles from '../styles/styles'

const loveOnIcon =  require('../../assets/icons/love-on.png')
const loveOffIcon =  require('../../assets/icons/love-off.png')
const skipIcons = [
    require('../../assets/icons/skip-on-x3.png'),
    require('../../assets/icons/skip-on-x2.png'),
    require('../../assets/icons/skip-on-x1.png'),
    require('../../assets/icons/skip-gray-x0.png')

]
import {orExp} from '../lib/lib'

// const calcFontSize  = text =>
//     text.length > 60 ? 20 : 30

const calcFontSize  = text =>
    30 - (1 - Math.min(60/text.length, 1))*15


export default QuestionView = ({question,toggleFavoriteQuestion,remove,skip,isFavorite,skips}) =>

    <View style={[localStyles.cardContainer ]}>
        <View style={styles.txtView}>

            <Text style={[{
                color: orExp(question.card) ? '#8CF5E7' : '#4F9188',
                fontSize: calcFontSize(question.card)
            },  styles.expTextView, ]}>

                {question.card.split(' or ')[0]}

            </Text>
        </View>
        <View style={[styles.txtView]}>

            {orExp(question.card) && <Text style={[ {fontSize: calcFontSize(question.card)}, styles.expTextView]}> or </Text>}

        </View>
        <View style={styles.txtView}>

            {orExp(question.card) &&
            <Text style={[{
                color: '#90ED9B',
                fontSize: calcFontSize(question.card)
            },  styles.expTextView, ]}>

                {question.card.split(' or ')[1]}

            </Text>
            }

        </View>
        <View style={styles.bottomIonsView}>

            <TouchableHighlight
                underlayColor='white'
                onPress={() => skip(question)}
                style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}} >
                <Image source={skipIcons[skips]}/>
            </TouchableHighlight>

            <TouchableHighlight
                underlayColor='white'
                onPress={() => remove(question)}
                style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
                <Image source={require('../../assets/icons/loathe-off.png')}/>
            </TouchableHighlight>

            <TouchableHighlight
                underlayColor='white'
                onPress={() => toggleFavoriteQuestion(question)}
                style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}} >
                <Image source={isFavorite ? loveOnIcon : loveOffIcon}/>
            </TouchableHighlight>

        </View>

    </View>

QuestionView.propTypes = {
    question: PropTypes.object,
    style: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
    onLike: PropTypes.func,
    onUnlike: PropTypes.func,
    onRemoveQuestion: PropTypes.func,
    onShuffle: PropTypes.func,
    isFavorite: PropTypes.bool,
}

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
    },

})



