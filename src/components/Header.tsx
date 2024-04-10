export default function Header() {
  return (
    <header>
      <nav className="flex justify-between items-center bg-gray-900 p-4">
        <a href="/" className="text-white text-2xl font-bold">Wordle</a>
        <ul className="flex gap-10 p-4">
          <a href="/" className="text-white font-bold">Play</a>
          <a href="/about" className="text-white">About</a>
          <a href="/highscore" className="text-white">Highscore</a>
        </ul>
      </nav>
    </header>
  );
}