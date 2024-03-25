import { observer } from "mobx-react-lite";

type KeyboardProps = {
    keyboardProps: {
        correct: string[];
        used: string[];
        misplaced: string[];
        handleKeydown: (e: string) => void;
    };
};

const Keyboard = observer(({ keyboardProps }: KeyboardProps) => {
    const { correct, used, misplaced, handleKeydown } = keyboardProps;
    const alphabet = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']
    return (
        <div>
            {alphabet.map((row, i) => {
                return (
                    <div key={i} className="flex justify-center">
                        {row.split('').map((letter, j) => {
                            const bgColor = 
                            correct.includes(letter) ? 'bg-green-500' : 
                            misplaced.includes(letter) ? 'bg-yellow-500' : 
                            used.includes(letter) ? 'bg-gray-600' : 'bg-gray-200';
                            return (
                                <>
                                    { i === 2 && j === 0 && <div key="enter" onClick={() => handleKeydown('Enter')} className={`m-1 p-4 bg-gray-200 rounded-sm font-bold cursor-pointer`}>ENTER</div> }
                                    <div key={j} onClick={() => handleKeydown(letter)} className={`m-1 p-4 ${bgColor} rounded-sm font-bold cursor-pointer`}>{letter.toUpperCase()}</div>
                                    { i === 2 && j === row.length - 1 && <div key="backspace" onClick={() => handleKeydown('Backspace')} className={`m-1 p-4 bg-gray-200 rounded-sm font-bold cursor-pointer`}>DEL</div> }
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