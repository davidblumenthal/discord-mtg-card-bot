import {CardType} from "../types";
import {makeTrie} from "./trie";
import {canonicalizeInputToArray, canonicalizeWord, trimBadStartWords} from "./canonicalize";

export function loadTrie(inputCards : CardType[]):ReturnType<typeof makeTrie> {
    const trie = makeTrie();
    for(const card of inputCards) {
        const cardName = card.name.trim();
        const path = trimBadStartWords(canonicalizeInputToArray(cardName));
        if (path.length) {
            if (cardName.split(/\s+/)[0]?.endsWith(",")) {
                //console.log("adding jace!!!");
                trie.addData([path[0]],card);
            }
            trie.addData(path, card);
        } else {
            console.log(`Couldn't make a name path for ${card.name}`);
        }
    }
    return trie;
}