const calcPercentage = (answers, question, direction) => {

    //check for nulls
    //const noOfUpRights = (question.swipeUp || 0) + (question.swipeRight || 0)
    //const noOfDownLefts = (question.swipeDown || 0) + (question.swipeLeft || 0)

    const noOfUpRights = Object.values(answers).filter(a => a.id === question.id && (a.direction === 'right' || a.direction === 'up')).length || 0
    const noOfDownLefts = Object.values(answers).filter(a => a.id === question.id && (a.direction === 'left' || a.direction === 'down')).length || 0

    //prevent division by zero
    if ((noOfDownLefts + noOfUpRights) == 0)
        return 0;

    if(direction === 'up' || direction == 'right')
            return Math.floor(noOfUpRights / (noOfDownLefts + noOfUpRights) * 100)

    if(direction === 'down' || direction == 'left')
            return Math.floor(noOfDownLefts / (noOfDownLefts + noOfUpRights) * 100)

}

const removeId = (collection, member) =>
    collection.filter(id => id !== member.id)

const addID = (collection, member) =>
    [member.id, ...collection]

const removeById = (collection, member) =>
    collection.filter(m => m.id !== member.id)

const includesById = (collection, member) =>
    collection.findIndex(m => m.id === member.id) > -1

const orExp = (cardText) => (cardText.indexOf(' or ') > -1)

const setValueByMember = (obj, value, propertyName) => {

    console.log('hello')

    return (
        {
            ...obj,
            [propertyName]: value,
        }
    )
}

const addValueByMember = (obj, value, propertyName) => {

    console.log('hello')

    return setValueByMember(obj,[value, ...obj[propertyName]], propertyName)
}

const removeValueByIdByMember = (obj, value, propertyName) => {

    console.log('hello')

    return setValueByMember(obj, removeById(obj[propertyName], value), propertyName)
}

const incrementValueByMember = (obj, propertyName) =>

    setValueByMember(obj, obj[propertyName] + 1, propertyName)


const   incrementValueByMemberOrZero = (obj, zeroValue, propertyName) =>

    setValueByMember(
        obj,
        zeroValue === obj[propertyName] ? 0 : obj[propertyName] + 1,
        propertyName)

export {calcPercentage, removeId, addID, removeById, includesById, orExp,
    setValueByMember, addValueByMember, removeValueByIdByMember, incrementValueByMember,
    incrementValueByMemberOrZero}

