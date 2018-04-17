import {AsyncStorage} from "react-native";
import * as firebase from 'firebase';

export const [
    FAVORITE_CARD_INDEX,
    CARD_INDEX,
    SEEN_CARDS,
    REMOVED_CARDS,
    PLAYED_CARD_COUNT,
    SKIPPED_CARD_COUNT,
    CARDS,
    ANSWERS,
    FAVORITE_CARDS,
    RULES_ACCEPTED,
    FIRST_TIME,
    WEIRD_OPENER_COLUMN,
    CLASSIC_OPENER_COLUMN,
    OPENER_INDICATOR
] = [
    'favoriteCardIndex',
    'cardIndex',
    'seenCards',
    'removedCards',
    'playedCardCount',
    'skippedCardCount',
    'cards',
    'answers',
    'favoriteCards',
    'rulesAccepted',
    'firstTime',
    'opener_weird',
    'opener_classic',
    'X'
]

const firebaseConfig = {
    apiKey: "AIzaSyAny9hO8XTL7HWcBvCHsVPZHdDb9_yb9Dw",
    authDomain: "its-not-that-deep.firebaseapp.com",
    databaseURL: "https://its-not-that-deep-dev.firebaseio.com",
    projectId: "its-not-that-deep",
    storageBucket: "its-not-that-deep.appspot.com",
    messagingSenderId: "322392756378"
}


export const FIREBASE_URL_CARDS_TEST =
    "https://its-not-that-deep-card-test.firebaseio.com/"

const fBapp = firebase.initializeApp(firebaseConfig);

// const cardsDb = fBapp.database(FIREBASE_URL_CARDS)
const cardsDb = fBapp.database(FIREBASE_URL_CARDS_TEST)
const db = fBapp.database()

//export async const loadDB = (handle) => syntax don't work and shit, word

export async function loadLocal(handle) {
    return JSON.parse(await AsyncStorage.getItem(handle))
}

export const setLocal = (handle, val) =>
    AsyncStorage.setItem(handle, JSON.stringify(val))

export async function loadAnswersDB(handle) {
    return (await db.ref(handle).once('value')).val()
}

export async function loadCardsDB(handle) {
    return (await cardsDb.ref(handle).once('value')).val()
}

export const pushDB = (handle, val) =>
    db.ref(handle).push(val)


