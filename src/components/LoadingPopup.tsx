"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const LoadingPopup: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed top-0 left-0 right-0 z-50 rounded-lg flex justify-center transition-transform duration-500 ease-out ${
        isVisible ? "translate-y-0" : "-translate-y-32"
      }`}
    >
      <div className="bg-main p-2 mt-4 rounded-sm  flex items-center gap-2 brutal">
        <div className="w-6 h-6 border-2 border-t-foreground border-r-foreground border-b-foreground border-l-transparent rounded-full animate-spin "></div>
        <span className="text-text font-normal text-lg ">
          LOADING ANIME...
        </span>
      </div>
    </div>,
    document.body
  );
};