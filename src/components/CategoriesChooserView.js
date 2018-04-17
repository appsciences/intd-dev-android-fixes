import React from 'react';

import {Alert, StyleSheet, Text, View, Image, TouchableHighlight, TouchableWithoutFeedback} from 'react-native';

import styles from '../styles/styles'
import {CATEGORY_CLASSIC, CATEGORY_WEIRD} from "../lib/const";

export default CategoriesChooserView = (props) =>

  <View
    style={styles.ruleContainer}>

    <View style={localStyles.categoryContainer}>

      <Text style={localStyles.title}>what&rsquo;s the mood?</Text>
      <View style={localStyles.categoryButtons}>
        <TouchableHighlight
          style={localStyles.buttonLarge}
          activeOpacity={0.6}
          underlayColor={'white'}
          onPress={() => props.categoryPress(CATEGORY_CLASSIC)}>

          <Text style={styles.buttonText}>classic</Text>

        </TouchableHighlight>

        <TouchableHighlight
          style={localStyles.buttonLarge}
          activeOpacity={0.6}
          underlayColor={'white'}
          onPress={() => props.categoryPress(CATEGORY_WEIRD)}
        >
          <View>
            <Text style={[styles.buttonText, {fontFamily: 'Quicksand-Bold'}]}>let&rsquo;s get</Text>
            <Text style={styles.buttonText}>weird</Text>
          </View>

        </TouchableHighlight>
      </View>
    </View>
  </View>

const localStyles = {
    title: {
        color: "white",
        // fontWeight: 'bold',
        fontSize: 24,
        fontFamily: 'Quicksand-Bold',
        marginBottom: 30

    },
  categoryButtons: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },

  buttonLarge: {
    width: 90,
    height: 90,
    padding: 20,
    borderRadius: 90 / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    shadowOffset: {width: -0.5, height: 0.5},
    shadowColor: 'black',
    shadowOpacity: 0.85,
    shadowRadius: 1
  },

  categoryContainer: {
    marginTop: 250,
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
}