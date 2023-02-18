import cards from "../../nameAndImageTest.json";
import {loadTrie} from "./loadTrie";
import {getData} from "./trie";

describe('loadTrie', () => {
    it('should load trie correctly', () => {
        const trie = loadTrie(cards);
        const card = getData(trie, ["static","orb"]);
        expect(card).toBeTruthy();
        expect(card.name).toBe('Static Orb');
    });
});