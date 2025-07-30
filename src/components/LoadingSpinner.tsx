export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="glass-effect rounded-2xl p-8 flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-600 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        <div className="text-center">
          <p className="text-gray-700 text-lg font-medium">Searching repositories...</p>
          <p className="text-gray-500 text-sm mt-1">This may take a few seconds</p>
        </div>
      </div>
    </div>
  );
} 