import {canonicalizeInputToArray, canonicalizeWord, trimBadStartWords} from "./canonicalize";

describe('canonicalize', () => {
    describe("canonicalizeWord", () => {
        it.each([
            ['HI', 'hi'],
            ['H0t', 'h0t'],
            ['h^&t','ht'],
            ['Lim-Dûl\'s', 'lim-duls']
        ])('should canonicalize "%s" to "%s"',
            (input, expected) => {
                expect(canonicalizeWord(input)).toBe(expected);
        });
    })

    describe("canonicalizeInputToArray", () => {
        it.each([
            [" the quick    fox ", ["the","quick","fox"]],
            ["the w8-of me^&e  ", ["the","w8-of", "mee"]],
        ]) ("should canonicalize '%s'", (input, expected) => {
            expect(canonicalizeInputToArray(input)).toStrictEqual(expected);
        })
    })

    describe("trimBadStartWords", () => {
        it("should trim 'a'", () => {
            expect(trimBadStartWords(["a","happy","man"])).toStrictEqual(["happy","man"]);
        })

        it("should not trim other stuff", () => {
            expect(trimBadStartWords(["oh","happy","man"])).toStrictEqual(["oh","happy","man"]);
        })
    })
});