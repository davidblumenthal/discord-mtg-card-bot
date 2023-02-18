import {addData, getData, newNode, Node} from "./trie";

describe('trie', () => {
    let trie: Node;

    beforeAll(() => {
        trie = newNode();
        addData(trie, ["the", "orb"], "this is the orb");
        addData(trie, ["the", "orb", "of", "darkness"], "this is the orb of darkness");
    });

    it('should find the short path', () => {
        expect(getData(trie, ["the", "orb"])).toBe("this is the orb");
    });

    it('should find the long path', () => {
        expect(getData(trie, ["the", "orb", "of", "darkness"])).toBe("this is the orb of darkness");
    });

    it('should not blow up with an extra-long path', () => {
        expect(getData(trie, ["the", "orb", "of", "darkness", "with", "more"])).toBeUndefined();
    });

    it('should not blow up with an unknown path', () => {
        expect(getData(trie, ["should", "not", "be", "found"])).toBeUndefined();
    });
});