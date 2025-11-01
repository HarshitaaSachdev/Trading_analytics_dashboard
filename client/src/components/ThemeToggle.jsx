import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ isDark, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
        isDark 
          ? 'bg-slate-800/50 border-slate-700 hover:border-slate-600 text-slate-300' 
          : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
      }`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <>
          <Sun className="w-4 h-4" />
          <span className="text-sm font-medium">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4" />
          <span className="text-sm font-medium">Dark</span>
        </>
      )}
    </button>
  );
}