export default function Input({ ...props }) {
  return (
    <input
      className="w-full bg-green-950 border border-green-700 rounded-lg px-4 py-2 text-white placeholder-green-600 focus:outline-none focus:border-yellow-400"
      {...props}
    />
  );
}
