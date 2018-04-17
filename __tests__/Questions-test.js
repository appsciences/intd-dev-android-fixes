import {isResetQuestions, answerCalcQuestions, answerCalcSeenQustions} from "../src/lib/questions";

const allQs = [
    {id: 1, category:'a'},
    {id: 2, category:'a'},
    {id: 3, category:'a'},
    {id: 4, category:'a'}
]


const currentQs = {a: [1, 2]}


it('isResetFalse', () => {
    expect(isResetQuestions(
        {a:[1,2]},
        allQs,
        [],
        'a')).toBe(
        false)
})

it('isResetTrue', () => {
    expect(isResetQuestions(
        {a:[1,2,3,4]},
        allQs,
        [],
        'a')).toBe(
        true)
})

it('isResetTruePlusRemoved', () => {
    expect(isResetQuestions(
        {a:[1,2,]},
        allQs,
        [3,4],
        'a')).toBe(
        true)
})

it('calcSeenNoReset', () => {

    expect(answerCalcSeenQustions({
        currentQ:{id:5, category:'a'},
        allQs,
        removedQs:[],
        seenQs:{a:[1,2]},
        category: 'a'})).toEqual(
        [1,2,5])

})

it('calcSeenReset', () => {

    expect(answerCalcSeenQustions({
        currentQ:{id:5, category:'a'},
        allQs,
        removedQs:[3,4],
        seenQs:{a:[1,2]},
        category: 'a'})).toEqual([])


})

it('answerCalcQuestionsNoReset', () => {

    expect(answerCalcQuestions({
        allQs,
        currentQs:[{id: 4, category:'a'}],
        removedQs:[3],
        seenQs:{a:[1,2]},
        category: 'a'})).toEqual(
        [{id: 4, category:'a'}]

    )
})

it('answerCalcQuestionsReset', () => {

    expect(answerCalcQuestions({
        allQs,
        currentQs:[{id: 4, category:'a'}],
        removedQs:[3],
        seenQs:{a:[]},
        category: 'a'})).toEqual([
        {id: 1, category:'a'},
        {id: 2, category:'a'},
        {id: 4, category:'a'}
]
    )
})
