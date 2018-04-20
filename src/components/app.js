import {Font, LinearGradient} from "expo";
import React from "react";
import GlobalSwiper from "../../mods/react-native-swiper";
import {StyleSheet, AsyncStorage, Image, Modal, View} from "react-native";
import CategoriesChooserView from "./CategoriesChooserView";
import RuleContainer from "./RuleContainer";
import QuestionContainer from "./QuestionContainer";
import styles from "./../styles/styles";
import MenuView from "./MenuView";
import Dialog, {DialogButton} from "react-native-md-dialog";
import {CATEGORY_CLASSIC, CATEGORY_WEIRD} from "../constants";
import TcView from './TcView';
import {
    includesById,
    removeValueByIdByMember,
    incrementValueByMemberOrZero,
    addValueByMember
} from "../lib/lib";

import * as storage from '../lib/storage'

import {answerCalcSeenQustions, answerCalcQuestions, loadCalcCategoryQuestions} from '../lib/questions'
import {RULES_CARD} from "../lib/const";
const {shuffle} = require('lodash');


const background = require('../../assets/images/background.png')

const RULES_SCREEN_INDEX = 1;
const CATEGORIES_SCREEN_INDEX = 2;
const QUESTIONS_SCREEN_INDEX = 3;
const QUESTIONS_TO_RULES_MOVE_BY = -2;
const RULES_TO_QUESTIONS_MOVE_BY = 2;
const RULES_TO_CATEGORIES_MOVE_BY = 1;
const CATEGORIES_TO_QUESTIONS_MOVE_BY = 1;
const QUESTIONS_TO_CATEGORIES_MOVE_BY = -1;
//the below depends on whether rules are rendered, see render()
const INTRO_TO_RULES_OR_CATEGORIES_MOVE_BY = 1;

const EMPTY_CARD_COLLECTION = {[CATEGORY_CLASSIC]:[], [CATEGORY_WEIRD]:[]}
const EMPTY_INDEX_COLLECTION = {[CATEGORY_CLASSIC]:0, [CATEGORY_WEIRD]:0}

const OFFLINE_MODE = false
const NO_LOCAL_DATA = true

export default class App extends React.Component {

    currentQuestions = EMPTY_CARD_COLLECTION
    allQuestions = []

    removedQuestions = []
    seenQuestions = EMPTY_CARD_COLLECTION
    answers = []

    //need to keep favorite currentQuestions in state to cause refresh on the heart clicked
    //need to have full currentQuestions in favoritequestions so as to not filter them on every swipe -- swiper don't like that
    state = {
        rewindRules: false,
        renderRules: false,
        rulesAccepted: false,
        globalSwipeIndex: 0,
        showTCModal: true,
        darkenBackground: false,
        dataLoaded: false,
        fontLoaded: false,
        skips: 0,
        showMenu: false,
        favoritesMode: false,
        playedCardCount: 0,
        currentCategory: CATEGORY_CLASSIC,
        //need favorites in state for update of heart
        favoriteQuestions: {
            [CATEGORY_CLASSIC]: [],
            [CATEGORY_WEIRD]: []
        },
        cardIndex: {
            EMPTY_INDEX_COLLECTION
        },
        favoriteCardIndex: {
            EMPTY_INDEX_COLLECTION
        },
    };

    componentDidMount() {

        Font.loadAsync({
            'OpenSans-Light': require('../../assets/fonts/OpenSans-Light.ttf'),
            'OpenSans': require('../../assets/fonts/OpenSans-Regular.ttf'),
            'OpenSans-Bold': require('../../assets/fonts/OpenSans-Semibold.ttf'),
            'Quicksand-Bold': require('../../assets/fonts/Quicksand-Bold.ttf'),
            'Quicksand-Light': require('../../assets/fonts/Quicksand-Light.ttf'),
            'Quicksand-Medium': require('../../assets/fonts/Quicksand-Medium.ttf'),
            'Quicksand-Regular': require('../../assets/fonts/Quicksand-Regular.ttf'),
        }).then(() =>
            this.setState({fontLoaded: true})
        )

        //skip rules if needed
        this.loadData().then(() => {
            this.setState({
                dataLoaded: true
            })
        })

        setTimeout(() => this.gotoRulesFromIntro(), 1500)

    }

    async loadData() {

        //Clear seen currentQuestions for debugging
        //AsyncStorage.setItem('seenQuestions', JSON.stringify([]))

        this.removedQuestions = await storage.loadLocal(storage.REMOVED_CARDS) || []

        this.seenQuestions = await storage.loadLocal(storage.SEEN_CARDS) || EMPTY_CARD_COLLECTION
        // this.seenQuestions = {[CATEGORY_CLASSIC]:[], [CATEGORY_WEIRD]:[0,1]}

        if(OFFLINE_MODE){

            this.allQuestions = require('../../assets/json/cards-test.json').cards

            this.answers = []
        }
        else{

            this.allQuestions = shuffle(await storage.loadCardsDB(storage.CARDS)) || EMPTY_CARD_COLLECTION

            this.answers = await storage.loadAnswersDB(storage.ANSWERS) || []

        }

        console.log(this.allQuestions)

        const rulesAccepted = await storage.loadLocal(storage.RULES_ACCEPTED) || false

        const calcQuestions = (category, openerColumn, isFirstTime) =>
            loadCalcCategoryQuestions({
                allQs: this.allQuestions,
                column: openerColumn,
                rulesQuestion: {id:-1, card:RULES_CARD},
                openerColumn: openerColumn,
                openerIndicator: storage.OPENER_INDICATOR,
                category: category,
                removedQs: this.removedQuestions,
                seenQs: this.seenQuestions,
                isFirstTime

            })

        const isFirstTime = await storage.loadLocal(storage.FIRST_TIME) || false

        this.currentQuestions = {
            [CATEGORY_CLASSIC]: calcQuestions(CATEGORY_CLASSIC, storage.CLASSIC_OPENER_COLUMN, isFirstTime),
            [CATEGORY_WEIRD]: calcQuestions(CATEGORY_WEIRD, storage.WEIRD_OPENER_COLUMN, isFirstTime)
        }

        this.setState({
            playedCardCount: await storage.loadLocal(storage.PLAYED_CARD_COUNT) || 0,
            rulesAccepted: rulesAccepted,
            renderRules: !rulesAccepted,
            skipped: await storage.loadLocal(storage.SKIPPED_CARD_COUNT) || 0,
            favoriteQuestions: await storage.loadLocal(storage.FAVORITE_CARDS) || EMPTY_CARD_COLLECTION,
            cardIndex: await storage.loadLocal(storage.CARD_INDEX) || EMPTY_INDEX_COLLECTION,
            favoriteCardIndex: await storage.loadLocal(storage.FAVORITE_CARD_INDEX) || EMPTY_INDEX_COLLECTION,
        })

    }

    answerQuestion = (question, direction) => {

        //TODO: store skipped card count

        if(!this.state.favoritesMode) {
            this.seenQuestions[this.state.currentCategory] = answerCalcSeenQustions({
                currentQ:question,
                allQs:this.allQuestions,
                removedQs: this.removedQuestions,
                seenQs: this.seenQuestions,
                category: this.state.currentCategory
            })

            //need to reset cards if the end is reached
            this.currentQuestions[this.state.currentCategory] = answerCalcQuestions({
                allQs: this.allQuestions,
                currentQs: this.currentQuestions[this.state.currentCategory],
                removedQs: this.removedQuestions,
                seenQs:this.seenQuestions,
                category: this.state.currentCategory
            })
            storage.setLocal(storage.SEEN_CARDS, this.seenQuestions)
        }

        this.setState(
            this.state.favoritesMode ? {
                favoriteCardIndex: incrementValueByMemberOrZero(
                    this.state.favoriteCardIndex,
                    this.state.favoriteQuestions[this.state.currentCategory].length - 1,
                    this.state.currentCategory
                ),
            } : {
                cardIndex: incrementValueByMemberOrZero(
                    this.state.cardIndex,
                    this.currentQuestions[this.state.currentCategory].length - 1,
                    this.state.currentCategory
                ),
                playedCardCount: this.state.playedCardCount + 1
            },
            ()=>storage.setLocal(storage.PLAYED_CARD_COUNT, this.state.playedCardCount)
        )

        storage.setLocal(storage.FIRST_TIME, false)

        storage.pushDB(storage.ANSWERS).push({
            id: question.id,
            direction
        });

    }

    componentWillMount() {
        this.intro = require('../../assets/images/intro.png')
    }

    //setting swiper index doesn't work in iOS
    moveGlobalSwiper = (iOSby, index, rulesHack = false) => {
        this.setState({
            showMenu: false,
        })
        this.refs.globalSwiper.scrollBy(iOSby, true, rulesHack)
    }

    //render rules in case they were not rendered because of rules accepted.
    //HACK: due to the fact that swiper caches index (which should change since we added a child)
    //a quick hack is added to bypass index calculation
    gotoRulesFromCards = () => {
        //if we rules are not rendered, need to use the hack
        const useRulesHack = !this.state.renderRules

        this.setState({renderRules: true, rewindRules: true},
            this.moveGlobalSwiper(QUESTIONS_TO_RULES_MOVE_BY, RULES_SCREEN_INDEX, useRulesHack)
        )
    }

    gotoRulesFromIntro = () => {
        //wait for all loads, then turn off interval timer and set state to render global swiper then move it


        const timerID = setInterval(
            () => {
                if (this.state.fontLoaded &&
                    this.state.dataLoaded) {

                    clearInterval(timerID)
                    this.moveGlobalSwiper(INTRO_TO_RULES_OR_CATEGORIES_MOVE_BY, RULES_SCREEN_INDEX)
                }
            },
            100)

    }

    gotoQuestions = () =>
        this.moveGlobalSwiper(RULES_TO_QUESTIONS_MOVE_BY, QUESTIONS_SCREEN_INDEX)

    gotoCatsFromCards = () =>
        this.moveGlobalSwiper(QUESTIONS_TO_CATEGORIES_MOVE_BY, CATEGORIES_SCREEN_INDEX)

    gotoCatsFromRules = () =>
        this.moveGlobalSwiper(RULES_TO_CATEGORIES_MOVE_BY, CATEGORIES_SCREEN_INDEX)

    categoryPress = (category) => {

        this.setState({currentCategory: category})

        this.moveGlobalSwiper(CATEGORIES_TO_QUESTIONS_MOVE_BY, QUESTIONS_SCREEN_INDEX)
    }

    showTC = (showTC) => showTC && this.refs.tcDialog ?
        this.refs.tcDialog.open() : this.refs.tcDialog.close()

    tcDone = () => {
        this.showTC(false)
        this.setState({rulesAccepted: true})
        AsyncStorage.setItem('rulesAccepted', JSON.stringify(true))

        this.gotoCatsFromRules()
    }

    ruleContainer = () => {
        this.rules = <RuleContainer
            ref="rules"
            rewindRules={this.state.renderRules}
            onDone={this.state.rulesAccepted ? this.gotoQuestions : this.showTC}
            doneText={this.state.rulesAccepted ? "Back to the Game" : "Push this to play"}
        />

        return this.rules
    }

    render = () => {

        return <LinearGradient colors={['#90ed9a','#88f7e7']} style={{flex: 1}} start={[0,0]} end={[1,0]} >
            <Image
                source={background}
                style={styles.backgroundImage}
            >

            <GlobalSwiper
                ref='globalSwiper'
                showsPagination={false}
                scrollEnabled={false}
                index={this.state.globalSwipeIndex}
                //Go straight to cards
                //index={3}

            >
                <Image
                    source={this.intro}
                    style={styles.backgroundImage}/>

                {this.state.renderRules && this.state.fontLoaded && this.ruleContainer()}

                {this.state.fontLoaded && <CategoriesChooserView categoryPress={this.categoryPress}/>}

                {this.state.fontLoaded && this.state.dataLoaded && <QuestionContainer
                    showMenu={() => this.setState({showMenu: true})}
                    answer={this.answerQuestion}
                    answers={this.answers}
                    cardIndex={this.state.favoritesMode ?
                        this.state.favoriteCardIndex[this.state.currentCategory] :
                        this.state.cardIndex[this.state.currentCategory]}

                    isFavorite={(question) =>
                        includesById(this.state.favoriteQuestions[this.state.currentCategory], question)
                    }

                    toggleFavoriteQuestion={(question) => {

                        this.setState({
                            favoriteQuestions:
                                !includesById(this.state.favoriteQuestions[this.state.currentCategory], question) ?
                                    addValueByMember(
                                        this.state.favoriteQuestions,
                                        question,
                                        this.state.currentCategory
                                    ) :
                                    removeValueByIdByMember(
                                        this.state.favoriteQuestions,
                                        question,
                                        this.state.currentCategory
                                    )
                        })

                        storage.setLocal(storage.FAVORITE_CARDS, this.state.favoriteQuestions)
                    }}

                    remove={
                        (question) => {
                            this.removedQuestions = [...this.removedQuestions, question]
                            storage.setLocal(storage.REMOVED_CARDS, this.removedQuestions)
                        }
                    }

                    //setState can introduce delay, thus next
                    skip={(next) => this.state.skips <= 2 &&
                        this.setState({skips: this.state.skips + 1}, next)}

                    skips={this.state.skips}

                    questions={!this.state.favoritesMode ?
                        this.currentQuestions[this.state.currentCategory] :
                        this.state.favoriteQuestions[this.state.currentCategory]

                    }
                    favoriteQuestions={this.state.favoriteQuestions}

                />}
            </GlobalSwiper>

            <Modal
                visible={this.state.showMenu}
                transparent={true}
                animationType='fade'
                onRequestClose={() =>
                    this.setState({showMenu: false})
                }
            >

                <MenuView
                    cardCount={this.state.playedCardCount}
                    disableFavorites={!this.state.favoriteQuestions[this.state.currentCategory].length}
                    toggleFavoritesMode={() => {
                        this.currentQuestions[this.state.currentCategory] = this.currentQuestions[this.state.currentCategory].filter(q =>
                            !includesById(this.removedQuestions, q)
                        )
                        this.setState({
                            favoritesMode: !this.state.favoritesMode,
                            showMenu: false
                        })

                    }}
                    gotoRules={this.gotoRulesFromCards}
                    gotoCats={this.gotoCatsFromCards}
                    isFavoritesMode={this.state.favoritesMode}
                    hideMenu={() =>
                        this.setState({showMenu: false})
                    }
                />
            </Modal>
            <Dialog
                actions={[
                    <DialogButton text='Agree' key={0} onPress={this.tcDone}/>
                ]}
                ref='tcDialog'
                title='Terms & Conditions'
            >
                <TcView/>

            </Dialog>
            </Image>
        </LinearGradient>
    }


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
    },
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    }
})