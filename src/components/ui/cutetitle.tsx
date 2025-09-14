import React from 'react'

const cutetitle = () => {
    return (
        <div>  {/* Japanese-style badge */}
            <div className="absolute top-2 left-2 md:top-4 md:left-4 lg:top-2 lg:left-2  px-2 py-1 md:px-3 md:py-1 transform -rotate-2">
                <div className="flex items-center gap-1">

                    <div className="relative">
                        {/* Cute decorative elements */}
                        <div className="absolute -top-3 -left-3 text-pink-400 text-2xl  z-2">
                            🌸
                        </div>


                        <div className="border-2 border-dashed border-pink-300 px-4 py-3 md:px-3 md:py-2 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg transform -rotate-1 shadow-lg">
                            <div className="flex items-center justify-center gap-2 md:gap-4">
                                <span className="font-semibold text-sm md:text-lg  text-text">
                                    FEATURED ANIME
                                </span>

                            </div>

                        </div>
                    </div>
                </div>
            </div></div>
    )
}

export default cutetitle