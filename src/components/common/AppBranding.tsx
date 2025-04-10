export default function AppBranding() {
  return (
    <div className="flex items-center space-x-3">
      <img
        src="/auth.png"
        alt="App Logo"
        className="w-10 h-10 rounded-full bg-teal-400 shadow-md"
      />
      <h1 className="text-3xl font-bold text-white tracking-wide">
        Easygen App
      </h1>
    </div>
  );
}
