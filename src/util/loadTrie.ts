import {CardType} from "../types";
import {addData, newNode, Node} from "./trie";
import {canonicalizeInputToArray, canonicalizeWord, trimBadStartWords} from "./canonicalize";

export function loadTrie(inputCards : CardType[]) : Node {
    const trie = newNode();
    for(const card of inputCards) {
        const cardName = card.name;
        const path = trimBadStartWords(canonicalizeInputToArray(cardName));
        addData(trie, path, card);
    }
    return trie;
}