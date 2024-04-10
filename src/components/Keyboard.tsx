import { observer } from "mobx-react-lite";

type KeyboardProps = {
    keyboardProps: {
        correctLetters: string[];
        usedLetters: string[];
        misplacedLetters: string[];
        handleKeydown: (e: string) => void;
    };
};

const Keyboard = observer(({ keyboardProps }: KeyboardProps) => {
    const { correctLetters, usedLetters, misplacedLetters, handleKeydown } = keyboardProps;
    const alphabet = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']
    return (
        <div>
            {alphabet.map((row, i) => {
                return (
                    <div key={i} className="flex justify-center mb-2">
                        {row.split('').map((letter, j) => {
                            const bgColor = 
                            correctLetters.includes(letter) ? 'bg-letter-correct' : 
                            misplacedLetters.includes(letter) ? 'bg-letter-misplaced' : 
                            usedLetters.includes(letter) ? 'bg-letter-incorrect' : 'bg-letter-default';
                            return (
                                <>
                                    { i === 2 && j === 0 && <div key="enter" onClick={() => handleKeydown('Enter')} className={`mx-1 p-3 bg-letter-default rounded-sm font-bold cursor-pointer keyboard-hover`}>ENTER</div> }
                                    <div key={j} onClick={() => handleKeydown(letter)} className={`mx-1 p-3 ${bgColor} rounded-sm font-bold cursor-pointer keyboard-hover`}>{letter.toUpperCase()}</div>
                                    { i === 2 && j === row.length - 1 && <div key="backspace" onClick={() => handleKeydown('Backspace')} className={`mx-1 p-3 bg-letter-default rounded-sm font-bold cursor-pointer keyboard-hover`}>DEL</div> }
                                </>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
})

export default Keyboard;