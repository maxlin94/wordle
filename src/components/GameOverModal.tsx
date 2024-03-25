import { useEffect, useState } from "react";

export default function GameOverModal({ init }: { init: () => void}) {
    const [gameState, setGameState] = useState({
        hasWon: false,
        hasLost: false,
        numGuesses: 0,
        word: '',
        timePassed: 0,
        guesses: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await fetch(`/api/result`);
                const data = await response.json();
                setGameState(data);
                setLoading(false);
            };
            fetchData();
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }, [])

    return (
        <>
        { !loading && 
            <div className="fixed flex flex-col justify-center gap-4 text-white p-8 bg-black opacity-95  items-center rounded-md">
                {gameState.hasLost && <>
                    <h2 className="text-4xl font-bold">Game Over</h2>
                    <p className="text-2xl">The word was: {gameState.word}</p>
                    <button className="bg-gray-700 text-white p-2 rounded-lg font-semibold" onClick={() => init()}>Play Again</button>
                </>}
                {gameState.hasWon && <>
                    <h2 className="text-4xl font-bold">Congratulations!</h2>
                    <p className="text-2xl">The word was: {capitalize(gameState.word)}</p>
                    <p className="text-2xl">You won in: {gameState.timePassed}s</p>
                    <p className="text-2xl">Number of guesses: {gameState.numGuesses}</p>
                    <p>Your guesses: {gameState.guesses.map((guess, index) => {
                        return <span key={index} className="mr-2">{capitalize(guess)}</span>
                    })}</p>
                    <div className="flex justify-between w-full">
                    <button className="bg-gray-700 text-white p-2 mr-6 rounded-lg font-semibold" onClick={() => init()}>Play Again</button>
                    <button className="bg-gray-700 text-white p-2 rounded-lg font-semibold">Submit to highscore</button>
                </div>
                </>}
            </div>
        }
        </>
    )
}

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}