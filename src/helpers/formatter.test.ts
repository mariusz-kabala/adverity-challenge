import { formatter } from './formatter'

describe("formatter helper", () => {
    it ('Should format thousands', () => {
        expect(formatter(1200)).toBe('1.2K')
    })

    it('Should format millions', () => {
        expect(formatter(1500000)).toBe('1.5M')
    })

    it('Should format billions', () => {
        expect(formatter(9000000000)).toBe('9G')
    })

    it ('Should not change the number format', () => {
        expect(formatter(500)).toBe(500)
    })
})