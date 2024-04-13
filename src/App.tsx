import { useEffect } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import WordleStore from './stores/WordleStore';
import GuessBox from './components/GuessBox';
import Keyboard from './components/Keyboard';
import Settings from './components/Settings';
import MakeGuess from './components/MakeGuess';
import GameOverModal from './components/GameOverModal';
import Header from './components/Header';
import ErrorMessage from './components/ErrorMessage';

const App = observer(() => {
  const store = useLocalObservable(() => WordleStore)
  useEffect(() => {
    store.init()
    document.addEventListener('keydown', (e) => {
      store.handleKeydown(e.key)
    })
    return () => {
      document.removeEventListener('keydown', (e) => {
        store.handleKeydown(e.key)
      })
    }
  }, [])
  return (
    <div className="h-screen bg-gray-800">
      <Header />
      <div className="flex flex-col justify-center items-center bg-gray-800">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-400 m-6">WORDLE</h1>
        <div className="relative">
          <Settings store={store} />
          <GuessBox guesses={store.guesses} wordLength={store.wordLength} />
        </div>
        {(store.hasWon || store.hasLost) &&
          <GameOverModal init={store.init} setForceNewWord={store.setForceNewWord} hasLost={store.hasLost} hasWon={store.hasWon} />
        }
        { store.errorMessage && <ErrorMessage message={store.errorMessage} /> }
        <Keyboard
          keyboardProps={{
            handleKeydown: store.handleKeydown,
            correctLetters: store.correctLetters,
            usedLetters: store.usedLetters,
            misplacedLetters: store.misplacedLetters
          }}
        />
        { !store.allowDuplicates && <MakeGuess store={store} /> }
      </div>
    </div>
  )
})

export default App;