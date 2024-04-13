export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="absolute text-red-700 text-2xl font-bold">{message}</div>
  )
}