"use client"
import React from "react";

const Footer = () => {
    return (
        <footer  className="flex items-center justify-center">
            <div className="flex flex-col justify-center items-center gap-2 text-center relative mb-8">
                  {/* Main thank you message */}
                
                    <div className="text-xl sm:text-2xl font-semibold font-heading tracking-wide">
                        ARIGATŌ GOZAIMASU
                    </div>
              
                 {/* Bottom decorative text */}
                <div className="text-xs sm:text-sm font-heading text-gray-500 dark:text-gray-400 tracking-widest">
                    ～ Stay kawaii, stay brutal ～
                </div>
            </div>
        </footer>
    );
};

export default Footer;