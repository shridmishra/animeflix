import Image from "next/image";
import React from "react";

const Separator = () => {
  return (
    <div className="flex justify-center items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
      {/* Anime-themed images with responsive sizes */}
      <Image
        src="/icons/Magical-Random-Anime-Girl-Theme-PNG.png"
        width={50}
        height={50}
        alt="Magical Anime Girl"
        className="w-10 h-10 sm:w-[65px] sm:h-[65px] "
      />
      
      {/* Curly line using SVG with responsive width */}
      <svg
        className="w-12 h-6 sm:w-16 sm:h-8 text-main"
        viewBox="0 0 64 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 8 C 16 0, 48 16, 64 8"
          stroke="currentColor"
          strokeWidth="2"
          className="brutal brutal-surface"
        />
      </svg>

      <Image
        src="/icons/Elegant-Random-Anime-Girl-Appearance-PNG.png"
        width={45}
        height={45}
        alt="Elegant Anime Girl"
        className="w-9 h-9 sm:w-[60px] sm:h-[60px] "
      />

      {/* Second curly line */}
      <svg
        className="w-12 h-6 sm:w-16 sm:h-8 text-main"
        viewBox="0 0 64 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 8 C 16 0, 48 16, 64 8"
          stroke="currentColor"
          strokeWidth="2"
          className="brutal brutal-surface"
        />
      </svg>

      <Image
        src="/icons/Lively-Random-Anime-Girl-Environment-PNG.png"
        width={50}
        height={50}
        alt="Lively Anime Girl"
        className="w-10 h-10 sm:w-[65px] sm:h-[65px] "
      />
    </div>
  );
};

export default Separator;