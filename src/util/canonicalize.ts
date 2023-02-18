const CANONICALIZE_REGEX = /[^a-z0-9\-]/g;

export function canonicalizeWord(inputWord : string) : string {
    return inputWord.normalize('NFKD').toLowerCase().replaceAll(CANONICALIZE_REGEX, "");
}

export function canonicalizeInputToArray(inputString : string) : string[] {
    return inputString
        .trim()
        .split(/\s+/)
        .map(inputWord => canonicalizeWord(inputWord));
}

const badStartWords = new Set(["the","a"]);
export function trimBadStartWords(inputArray : string[]) : string[] {
    if(badStartWords.has(inputArray[0])) {
        const [, ...outputArray] = inputArray;
        return outputArray;
    }
    return inputArray;
}
