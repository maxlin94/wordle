import { useEffect } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import WordleStore from './stores/WordleStore';
import GuessBox from './components/GuessBox';
import Keyboard from './components/Keyboard';
import Settings from './components/Settings';
import GameOverModal from './components/GameOverModal';

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
    <div className="flex flex-col h-screen w-screen justify-center items-center bg-gray-800">
      <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-400 mb-6">WORDLE</h1>
      <div className="relative">
        <Settings store={store} />
        <GuessBox guesses={store.guesses} wordLength={store.wordLength} />
      </div>
      {(store.hasWon || store.hasLost) &&
        <GameOverModal init={store.init}
        />
      }
      <Keyboard
        keyboardProps={{
          handleKeydown: store.handleKeydown,
          correct: store.correctLetters,
          used: store.usedLetters,
          misplaced: store.misplacedLetters
        }}
      />
    </div>
  )
})

export default App;