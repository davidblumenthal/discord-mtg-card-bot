import cards from "../../nameAndImageTest.json";
import {loadTrie} from "./loadTrie";
import {makeTrie} from "./trie";

describe('loadTrie', () => {
    let trie: ReturnType<typeof loadTrie>;

    beforeAll(() => {
        trie = loadTrie(cards);
    })
    it('should load stuff explicitly added correctly', () => {
        const card = trie.getData(["static","orb"]);
        expect(card).toBeTruthy();
        expect(card.name).toBe('Static Orb');
    });

    it('should load things that start with a comma as the full name', () => {
        const card = trie.getData(["jace"]);
        expect(card).toBeTruthy();
        expect(card.name).toBe('Jace, the mind man');
    })
});