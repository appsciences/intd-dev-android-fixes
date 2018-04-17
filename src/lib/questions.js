export const isResetQuestions = (seenQs, allQs, removedQs, category) =>
    seenQs[category].length ===
        allQs.filter(q =>
            !removedQs.includes(q.id) &&
        q.category === category).length

export const answerCalcSeenQustions = ({currentQ, allQs, removedQs, seenQs, category}) =>
    isResetQuestions(seenQs, allQs,removedQs, category) ? [] :
    [...seenQs[category], currentQ.id]


export const answerCalcQuestions = ({allQs, currentQs, removedQs, seenQs, category}) =>

    seenQs[category].length === 0 ? allQs.filter(q =>
        q.category === category &&
        !removedQs.includes(q.id)) :
        currentQs

const loadCalcOpeners = (allQs, openerColumn, openerIndicator, category) =>
    allQs[category].filter(
        q =>
            q.category === category && q[openerColumn] === openerIndicator)

const loadCalcQuestions = (allQs, column, openerIndicator, category, removedQs, seenQs) =>
    allQs.filter(q =>
        q.category === category &&
        q[column] !== openerIndicator &&
        !removedQs.includes(q.id) &&
        !seenQs[category].includes(q.id)
    )

export const loadCalcCategoryQuestions = ({allQs, isFirstTime, rulesQuestion, column, openerColumn, openerIndicator, category, removedQs, seenQs}) =>
    [        ...isFirstTime ? rulesQuestion : [],
            ...isFirstTime ? loadCalcOpeners(allQs, openerColumn, openerIndicator, category) : [],
            ...loadCalcQuestions(
                    allQs,
                    column,
                    openerIndicator,
                    category,
                    removedQs,
                    seenQs
            )
    ]

