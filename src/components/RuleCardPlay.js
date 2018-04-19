import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import styles from '../styles/styles'

const RuleCardPlay = ({onDone, doneText}) =>
    <View style={styles.viewStyle}>
        <Text style={styles.cardText}>
          Screen 5
      </Text>
          <Text
              style={localStyles.tncText}
              onPress={onDone}>
              {doneText}
          </Text>
    </View >

const localStyles = StyleSheet.create({
    tncText: {
        color: "black",
        fontSize: 25,
        marginTop: 16,
        fontFamily: 'Quicksand-Bold',
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#000"
    },
    viewPager: {
        flex: 1,
        flexDirection: 'row',
    },

    pageStyle: {
        flex: 1
    },

    smallFont: {
        fontSize: 15,
    }


})
export default RuleCardPlay