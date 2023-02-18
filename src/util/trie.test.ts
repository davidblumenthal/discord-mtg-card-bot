import {makeTrie} from "./trie";

describe('trie', () => {
    let trie: ReturnType<typeof makeTrie>;

    beforeAll(() => {
        trie = makeTrie();
        trie.addData(["orb"], "this is the orb");
        trie.addData(["orb", "of", "darkness"], "this is the orb of darkness");
        trie.addData(["shining", "orb"], "this is the shining orb");
    });

    describe('getData', () => {

        it('should find the short path', () => {
            expect(trie.getData(["the", "orb"])).toBe("this is the orb");
        });

        it('should find the long path', () => {
            expect(trie.getData(["the", "orb", "of", "darkness"])).toBe("this is the orb of darkness");
        });

        it('should not blow up with an extra-long path', () => {
            expect(trie.getData(["the", "orb", "of", "darkness", "with", "more"])).toBeUndefined();
        });

        it('should not blow up with an unknown path', () => {
            expect(trie.getData(["should", "not", "be", "found"])).toBeUndefined();
        });
    });

    describe("getAllDataInPath", () => {
        it("should return two cards", () => {
            expect(trie.getAllDataInPath(
                ["this","is","the","shining","orb","of","darkness","right"]
            )).toStrictEqual([
                "this is the shining orb",
                "this is the orb",
                "this is the orb of darkness"
            ]);
        })
    });
});