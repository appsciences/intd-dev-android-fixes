import * as util from "../src/lib/lib";


it('AddId', () => {
    expect(util.addID([1],{id:2})).toEqual([2,1]);
});

it('RemoveId', () => {
    expect(util.removeId([1,2],{id:2})).toEqual([1]);
});

it('setValueByMember', () => {
    expect(util.setValueByMember(
            {
                weird: 1,
                classic:2

        },
        3,
        'weird')).toEqual(
            {
                weird: 3,
                classic:2
            }

    );
});

it('addValueByMember', () => {
    expect(util.addValueByMember(
        {
            weird: [1],
            classic:2

        },
        3,
        'weird')).toEqual(
        {
            weird: [3,1],
            classic:2
        }

    );
});

it('incrementValueByMemberOrZero', () => {
    expect(util.incrementValueByMemberOrZero(
        {
            weird: 5,
            classic:2

        },
        5,
        'weird')).toEqual(
        {
            weird: 0,
            classic:2
        }

    );
});

it('incrementValueByMember', () => {
    expect(util.incrementValueByMember(
        {
            weird: 5,
            classic:2

        },
        'weird')).toEqual(
        {
            weird: 6,
            classic:2
        }

    );
})

it('removeValueByIdByMember', () => {
    expect(util.removeValueByIdByMember({
            weird: [{id:5}],
            classic:[]

        },
        {id: 5},
        'weird')).toEqual({
        weird:[],
        classic:[]
    })
})

it('includesById', () => {
    expect(util.includesById([
        {
            id: 5,
            classic:2

        }],
        {
            id:5
        })).toBe(
            true
        );
})

it('includesById', () => {
    expect(util.includesById([
            {
                id: 6,
                classic:2

            }],
        {
            id:5
        })).toBe(
        false
    );
})

