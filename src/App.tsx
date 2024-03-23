import { useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import WordleStore from './stores/WordleStore';
import GuessBox from './components/GuessBox';
import Keyboard from './components/Keyboard';

export default function App() {
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
  }, [store])
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center bg-gray-800">
      <h1 className="text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-400 mb-6">WORDLE</h1>
      <GuessBox store={store} />
      <Keyboard store={store}/>
    </div>
  )
}
