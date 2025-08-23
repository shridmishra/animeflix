// src/components/ThemeToggle.tsx
'use client';

import useDarkMode from '@/hooks/useDarkMode';
import { Moon, Sun } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSidebar } from './ui/sidebar';

export default function ThemeToggle() {
  const { open } = useSidebar();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const mode = isDarkMode ? "Light" : "Dark";

  return (
    <div className="flex items-center justify-between border-t p-3 shadow-sm">
      {open ? (
        
        <>
          <div className="flex items-center gap-2">
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-text" />
            ) : (
              <Moon className="w-5 h-5 text-text" />
            )}
            <Label className="font-body text-sm">{mode} Mode</Label>
          </div>
          <Switch
            checked={isDarkMode}
            onCheckedChange={toggleDarkMode}
            aria-label="Toggle theme"
          />
        </>
      ) : (
        
        <>
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
        </>
      )}
    </div>
  );
}
