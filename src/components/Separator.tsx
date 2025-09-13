import Image from "next/image";
import React from "react";

const Separator = () => {
  return (
    <div>
      {/* Bottom anime-themed decoration */}
      <div className="flex justify-center items-center gap-6 mb-8">
        <Image
          src="/icons/Magical-Random-Anime-Girl-Theme-PNG.png"
          width={65}
          height={65}
          alt="pika"
        />
        <div className="h-1 w-16 bg-main rounded-full"></div>
        <Image
          src="/icons/Elegant-Random-Anime-Girl-Appearance-PNG.png"
          width={60}
          height={60}
          alt="pika"
        />
        <div className="h-1 w-16 bg-main rounded-full"></div>
        <Image
          src="/icons/Lively-Random-Anime-Girl-Environment-PNG.png"
          width={65}
          height={65}
          alt="pika"
        />
      </div>
    </div>
  );
};

export default Separator;
