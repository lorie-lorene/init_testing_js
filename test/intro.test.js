import {expect,test,describe} from 'vitest'
import { max,calcluerMoyenne} from '../intro'

describe('test max function',()=>{
    test("should return b if b>a ",()=>{
            const a=5;
            const b=6;
            const attend=6;

        const resulttat =max(a,b);
        expect(resulttat).toBe(attend);
        }),

    test("should return a if a>b ",()=>{
            const b=5;
            const a=6;
            const attend=6;

        const resulttat =max(a,b);
        expect(resulttat).toBe(attend);
        }),
    test("should return b or if b equal to a ",()=>{
            const a=6;
            const b=6;
            const attend=6;

        const resulttat =max(a,b);
        expect(resulttat).toBe(attend);
        })
})
// TTd
describe('calculer moyenne',()=>{
    test("should return null if array is empty",()=>{
            let tab=[]

            let rest=calcluerMoyenne(tab)
        expect(rest).toBe(NaN);
        })
    test("should return value of element if array is not empty and contain one element",()=>{
            let tab=[0]
        expect(calcluerMoyenne([0])).toBe(0);
        })

    test("should return moy if length of tab is sup than 1",()=>{
            let tab=[1,2,3]

            let rest=calcluerMoyenne(tab)
        expect(rest).toBe(2);
        })
    })