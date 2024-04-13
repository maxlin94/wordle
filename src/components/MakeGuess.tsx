import { useRef, useEffect } from 'react';
import words from '../../server/data/words.ts';

type MakeGuessProps = {
    store: WordleStoreType
}

type LetterType = {
    letter: string,
    index: number
}

const MakeGuess = ({ store }: MakeGuessProps) => {
    const wordListRef = useRef<string[]>([]);
    const correctLettersRef = useRef<LetterType[]>([]);
    const misplacedLettersRef = useRef<LetterType[]>([]);
    const usedLettersRef = useRef<string[]>([]);

    useEffect(() => {
        resetState();
    }, [store.wordLength, store.currentGuessIndex]);

    const makeGuess = async () => {
        if (store.currentWordLength > 0) {
            Array(store.currentWordLength).fill(0).forEach(() => store.handleKeydown('Backspace'));
        }
        const filteredList = await filterWordList(wordListRef.current);
        wordListRef.current = sortByLetterFrequency(filteredList);
        guess(wordListRef.current[0]);
    }

    function resetState() {
        correctLettersRef.current = [];
        misplacedLettersRef.current = [];
        usedLettersRef.current = [];
        wordListRef.current = words[store.wordLength].filter(word => {
            const set = new Set(word.split(''));
            return set.size === word.length;
        });  
    }

    function mostCommonLetters(wordList: string[]) {
        const letterFrequencyMap = new Map();
        wordList.forEach(word => {
            word.split('').forEach(letter => {
                if (letterFrequencyMap.has(letter)) {
                    letterFrequencyMap.set(letter, letterFrequencyMap.get(letter) + 1);
                } else {
                    letterFrequencyMap.set(letter, 1);
                }
            });
        });
        return letterFrequencyMap;
    }

    function sortByLetterFrequency(wordList: string[]) {
        const letterFrequencyMap = mostCommonLetters(wordList);
        wordList.sort((a, b) => {
            const frequencyA = a.split('').reduce((total: number, letter: string) => total + (letterFrequencyMap.get(letter)), 0);
            const frequencyB = b.split('').reduce((total: number, letter: string) => total + (letterFrequencyMap.get(letter)), 0);
            return frequencyB - frequencyA;
        });
        return wordList;
    }

    async function filterWordList(array: string[]) {
        const result = await fetch('/api/result/guesses')
        const data = await result.json()
        if(!data.guesses) return array;
        data.guesses.forEach((guess: GuessType[]) => {
            guess.forEach((letter, index) => {
                if (letter.result === 'correct') {
                    const alreadyCorrect = correctLettersRef.current.some(correct => correct.letter === letter.letter)
                    if (!alreadyCorrect) correctLettersRef.current = [...correctLettersRef.current, { letter: letter.letter, index }]
                } else if (letter.result === 'misplaced') {
                    misplacedLettersRef.current = [...misplacedLettersRef.current, { letter: letter.letter, index }]
                } else {
                    const alreadyUsed = usedLettersRef.current.includes(letter.letter)
                    if (!alreadyUsed) usedLettersRef.current = [...usedLettersRef.current, letter.letter]
                }
            })
        })
        const split = array.map(word => word.split(''));
        const filteredList = split.filter((splitWord: string[]) => {
            const allCorrectLetters = correctLettersRef.current.every(correct => splitWord[correct.index] === correct.letter);
            const allMisplacedLetters = misplacedLettersRef.current.every(misplaced => splitWord.includes(misplaced.letter) && splitWord.indexOf(misplaced.letter) !== misplaced.index);
            const noUsedLetters = !usedLettersRef.current.some(used => splitWord.includes(used));
            return allCorrectLetters && allMisplacedLetters && noUsedLetters;
        });
        return filteredList.map((splitWord: string[]) => splitWord.join(''));
    }

    function guess(word: string) {
        if (!word) return;
        word.split('').forEach(letter => {
            store.handleKeydown(letter);
        });
        store.handleKeydown('Enter');
    }

    return (
        <div>
            <button className="bg-gray-500 text-white text-2xl py-2 px-4 rounded-md" onClick={makeGuess}>Cheat</button>
        </div>
    );
}
export default MakeGuess;
