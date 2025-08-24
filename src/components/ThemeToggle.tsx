// src/components/ThemeToggle.tsx
'use client';

import useDarkMode from '@/hooks/useDarkMode';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="flex items-center  ">
      <div className='brutal p-2 rounded-md'>
         {isDarkMode ? (
        <Sun
          className="w-5 h-5 cursor-pointer text-text"
          onClick={toggleDarkMode}
        />
      ) : (
        <Moon
          className="w-5 h-5 cursor-pointer text-text"
          onClick={toggleDarkMode}
        />
      )}
      </div>
   

    </div>
  );
}
