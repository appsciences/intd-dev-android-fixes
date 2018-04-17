import React, {
    Component,
} from 'react'
import PropTypes from 'prop-types'
import {Modal, Text, View, Image, TouchableHighlight, TouchableWithoutFeedback, StyleSheet} from 'react-native';

import styles from '../styles/styles'


export default MenuView = ( {
                            cardCount,
                            toggleFavoritesMode,
                            gotoRules,
                            gotoCats,
                            isFavoritesMode,
                            disableFavorites,
                            hideMenu}) =>
    <TouchableWithoutFeedback
        style={localStyles.touchContainer}
        onPress={() => {
            hideMenu()
            console.info("menu close")
        }}>
            <View
                style={localStyles.touchContainer}>
              <View style={localStyles.modalContainer}>
                      <View>
                        <Text style={[styles.rulesText, {fontSize: 30, marginBottom: 8}]}>{cardCount}</Text>
                        <Text style={[styles.rulesText, {fontSize: 10}]}>Card Count</Text>
                      </View>
                <View>
                    {isFavoritesMode ?
                        <Text
                            style={styles.rulesText}
                            onPress={toggleFavoritesMode}>
                            All
                        </Text> :
                        <Text
                            style={disableFavorites ? [styles.rulesText, styles.textDisabled] :  styles.rulesText}
                            onPress = {disableFavorites ? ()=>{} : toggleFavoritesMode}>
                            Favorites
                        </Text>
                    }
                </View>

                <View>
                  <Text
                      style={styles.rulesText}
                      onPress={gotoCats} >
                    Change mood
                  </Text>
                </View>
                <View>
                  <Text
                      style={styles.rulesText}
                      onPress={gotoRules} >
                    Rules
                  </Text>
                </View>
              </View>
            </View>
    </TouchableWithoutFeedback>

MenuView.propTypes = {
    gotoRules: PropTypes.func.isRequired,
    gotoCats: PropTypes.func.isRequired,
    cardCount: PropTypes.number.isRequired,
    toggleFavoritesMode: PropTypes.func.isRequired,
    isFavoritesMode: PropTypes.bool.isRequired,
    disableFavorites: PropTypes.bool.isRequired
}


const localStyles = StyleSheet.create({
    touchContainer: {
        flex: 1,
        backgroundColor: '#55555588',
        alignItems: "stretch",
        justifyContent: "flex-end",
    },
    modalContainer: {
        marginTop: 0,
        justifyContent: "center",
        backgroundColor: "white",
        paddingTop: 15
    }
})