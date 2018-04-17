import React, {
    Component,
} from 'react';
import PropTypes from 'prop-types'
import {Image, Text, TouchableHighlight, View, StyleSheet} from "react-native";

import styles from "../styles/styles";
import QuestionView from './QuestionView'
import QuestionViewRules from './QuestionViewRules'
import Swiper from "../../mods/react-native-deck-swiper";
import {Ionicons} from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable'
import {orExp, calcPercentage} from '../lib/lib'

export default class QuestionContainer extends Component {

    state = {
        percentage: 0,
        notificationPosition: {
            marginTop: 0, marginLeft: 0
        },
    }

    //this is a hack to prevent percentage showing on remove and skip
    // shouldComponentUpdate = (nextProps, nextState) =>
    //     this.props.currentQuestions !== nextProps.currentQuestions || !this.nextProps.rerender

    removeCard = (question) => {
        this.props.remove(question)
        this.refs.swiper.swipeRight()
    }


    skipCard = (question) => {
        this.props.skip(()=>
            this.refs.swiper.swipeRight()
        )
    }

    onSwipe = (cardIndex, direction, favoritesMode) => {

        if( 0 === this.props.questions.length) return

        const question = this.props.questions[cardIndex];

        //only show percentages in 'or' cards
        if (orExp(question.card)) {

            this.setState({
                notificationPositionTop: {
                    marginTop: Math.floor(Math.random() * 15),
                    marginLeft: Math.floor(Math.random() * 220),
                },
                notificationPositionBottom: {
                    marginTop: Math.floor(Math.random() * 8),
                    //bottom needs to account for the (i) block
                    marginLeft: Math.floor(Math.random() * 160),
                },
                percentage: calcPercentage(this.props.answers, question, direction)
            })


            if (direction == 'right' || direction == 'up')
                this.refs.topNotification.fadeOut(3500)
            else
                this.refs.bottomNotification.fadeOut(3500)
        }

        this.props.answer(question, direction)

    }

    render = () => {

        return <View style={styles.questionContainer}>

            <View style={{
                height: '8%',
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 30,
                paddingRight: 30,


            }}>
                <Animatable.Text
                    ref="topNotification"
                    style={[this.state.notificationPositionTop, styles.notificationText]}
                >
                    {this.state.percentage}%
                </Animatable.Text>
            </View>
            <View style={{
                height: '7%',
                paddingTop: 20,
                paddingBottom: 10,
                paddingLeft: 30,
                paddingRight: 30,

            }}>
                <Image
                    source={require('../../assets/icons/up-arrow-white.png')}
                    style={{alignSelf:'center',
                    }}
                />

            </View>

            <View style={{
                height: '70%',
                alignItems: 'center',
                justifyContent: 'center'
            }}>

                {this.props.questions.length ? <Swiper
                    ref='swiper'
                    cardIndex={this.props.cardIndex}
                    cards={this.props.questions}
                    backgroundColor={null}
                    infinite={true}
                    onSwipedLeft={(cardIndex) => this.onSwipe(cardIndex, 'left')}
                    onSwipedRight={(cardIndex) => this.onSwipe(cardIndex, 'right')}
                    onSwipedTop={(cardIndex) => this.onSwipe(cardIndex, 'up')}
                    onSwipedBottom={(cardIndex) => this.onSwipe(cardIndex, 'down')}
                    renderCard={(question) =>
                        //we'll pass through favorites to cause a rerender on tooggleFavoriteQuestion

                        question && (question.card == 'rules' ? <QuestionViewRules/> : <QuestionView
                            question={question}
                            toggleFavoriteQuestion={(question) => {
                                this.props.toggleFavoriteQuestion(question)
                            }}
                            remove={this.removeCard}
                            skip={this.skipCard}
                            //need to pass value for rerender
                            isFavorite={this.props.isFavorite(question)}
                            skips={this.props.skips}
                        />)
                    }
                ><View/>
                </Swiper> : <Text style={styles.notificationText2}>No favorites</Text>}
            </View>
            <View style={{
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 30,
                paddingRight: 30,
                height: '7%',



            }}>

                <Image
                    source={require('../../assets/icons/down-arrow-white.png')}
                    style={{marginLeft:135}}

                />

            </View>

            <View style={{
                flexDirection:"row",
                height: '8%',


            }}>
                <View style={{
                    paddingTop: 0,
                    paddingBottom: 10,
                    paddingLeft: 30,
                    paddingRight: 30,
                    width: '82%',


                }}>
                    <Animatable.Text
                        ref="bottomNotification"
                        style={[this.state.notificationPositionBottom, styles.notificationText]}
                    >
                        {this.state.percentage}%

                    </Animatable.Text>

                </View>
                <View style={{
                    alignSelf: 'stretch',
                    justifyContent: 'flex-end',
                    paddingRight: 20,
                    paddingBottom: 20,
                    width: '18%'
                }}>

                    <TouchableHighlight
                        onPress={this.props.showMenu}
                        underlayColor='#55555511'
                    >

                        <Ionicons name="ios-information-circle-outline" size={40} color="white"
                                  style={localStyles.iconPadding}/>

                    </TouchableHighlight>

                </View>
            </View>

        </View>


    }
}

QuestionContainer.propTypes = {
    questions: PropTypes.array,
    cardIndex: PropTypes.number,
    style: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
    answer: PropTypes.func,
    isFavorite: PropTypes.func,
    onLike: PropTypes.func,
    onUnlike: PropTypes.func,
    onShuffle: PropTypes.func,
    remove: PropTypes.func,
}

QuestionContainer.defaultProps = {
    index: 0,
    title: '',
}

const localStyles = StyleSheet.create({
    iconPadding: {
        paddingLeft: 4,
        paddingRight: 4,
    }

})
