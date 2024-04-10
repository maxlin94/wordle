import Guess from "./Guess";

type GuessBoxProps = {
    guesses: Array<Array<GuessType>>,
    wordLength: number
}

export default function GuessBox ({ guesses, wordLength }: GuessBoxProps) {
    return (
        <div className="mb-3">
            {Array(guesses.length).fill(0).map((_, i) => (
                <Guess key={i} guesses={guesses} wordLength={wordLength} index={i} />
            ))}
        </div>
    )
}