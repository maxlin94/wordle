const WordleStore: WordleStoreType = {
    guesses: [],
    currentGuess: 0,
    wordLength: Math.floor(Math.random() * (8 - 4 + 1) + 4),
    currentWordLength: 0,
    allowDuplicates: false,
    correctLetters: [],
    misplacedLetters: [],
    usedLetters: [],
    init: async function () {
        this.guesses = Array(6).fill(Array(this.wordLength).fill({ letter: '', result: '' }));
        await fetch(`/api/words/random/${this.wordLength}?duplicates=${this.allowDuplicates}`)
        .then(res => res.json())
        .then(data => this.wordLength = data.wordLength);
        this.currentGuess= 0;
        this.currentWordLength = 0;
        this.correctLetters = [];
        this.misplacedLetters = [];
        this.usedLetters = [];
    },
    submitGuess: async function (guess: string) {
        const data = await fetch(`/api/words/guess?word=${guess}`).then(res => res.json()).then(data => data);
        if (data.message !== 'Success') return
        data.result.forEach((guess: GuessType) => {
            if (guess.result === 'correct' && !this.correctLetters.includes(guess.letter)) {
                this.correctLetters.push(guess.letter)
            }
            else if (guess.result === 'misplaced' && !this.misplacedLetters.includes(guess.letter)) {
                this.misplacedLetters.push(guess.letter)
            }
            else {
                this.usedLetters.push(guess.letter)
            }
        })
        this.guesses[this.currentGuess] = data.result;
        this.currentGuess++;
        this.currentWordLength = 0;
    },
    handleKeydown: function (key: string) {
        if (this.currentGuess >= this.guesses.length) return;
        if (key === 'Backspace' && this.currentWordLength > 0) {
            this.currentWordLength--;
            this.guesses[this.currentGuess][this.currentWordLength].letter = '';
            return;
        }
        if (key === 'Enter' && this.currentWordLength === this.wordLength) {
            const guess = this.guesses[this.currentGuess].map((char: GuessType) => char.letter).join('');
            this.submitGuess(guess);
            return;
        }
        if (key.length === 1 && key.match(/[a-z]/i) && this.currentWordLength < this.wordLength) {
            this.guesses[this.currentGuess][this.currentWordLength].letter = key;
            this.currentWordLength++;
            return;
        }
    },
    setWordLength: function (length: number) {
        this.wordLength = length;
    }
}

export default WordleStore