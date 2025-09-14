"use client";
import React, { useEffect, useState } from "react";
import ThemeToggle from "../ThemeToggle";
import { Button } from "../ui/button";
import { FaGithub, FaBars, FaTimes, FaUser } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > 50 && window.scrollY > lastScrollY) {
        setShow(false);
        setMenuOpen(false); 
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center brutal py-3 px-4 mx-4 sm:mx-8 lg:mx-28 mt-2 lg:mt-8 rounded-xl bg-surface transform transition-transform duration-300 overflow-visible ${
        show ? "translate-y-0" : "-translate-y-28"
      } dark:bg-gray-800`}
    >
      <div className="flex justify-center items-center gap-2 sm:gap-4 relative">
        {/* ICON: absolute but allowed to overflow and animate */}
        <div className="absolute -top-3 -left-3 sm:-top-9 sm:-left-6 z-50 pointer-events-none">
          <Image
            src="/icons/good.png"
            width={50}
            height={50}
            alt="good anime icon"
            className="block animate-upside-pendulum sm:w-[75px] sm:h-[75px]"
          />
        </div>
        <Link href="/" passHref>
          <Button
            variant="brutal"
            className="text-lg sm:text-xl font-extralight bg-surface-3 pl-10 sm:pl-14 py-3 sm:py-4 border-b-4 font-title dark:bg-gray-700 dark:text-white cursor-pointer"
          >
            AnimeFlix
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2 sm:gap-6">
        {/* Desktop Navigation and Buttons */}
        <div className="hidden sm:flex gap-3 font-medium">
          <Button
            variant="brutal"
            className="text-lg sm:text-xl bg-secondary-background py-2 sm:py-3 dark:bg-gray-600 dark:text-white"
            asChild
          >
            <Link href="/allAnimes" className="px-4">
              All Animes
            </Link>
          </Button>
        </div>
        <Button
          variant="brutal"
          className="hidden sm:flex text-lg sm:text-xl bg-secondary-background py-2 sm:py-3 dark:bg-gray-600 dark:text-white"
          asChild
        >
          <Link href="https://github.com/shridmishra/animeflix" target="_blank" rel="noopener noreferrer">
            <span className="mr-2">Give a Star</span>
            <FaGithub />
          </Link>
        </Button>
        <Button
          variant="brutal"
          className="hidden sm:flex text-lg sm:text-xl bg-secondary-background py-2 sm:py-3 dark:bg-gray-600 dark:text-white"
          asChild
        >
          <Link href="https://shrid.in" target="_blank" rel="noopener noreferrer">
           
            <FaUser />
          </Link>
        </Button>
        <div className="hidden sm:block">
          <ThemeToggle />
        </div>
        {/* Hamburger Icon for Mobile */}
        <Button
          variant="brutal"
          className="sm:hidden text-lg bg-secondary-background py-2 dark:bg-gray-600 dark:text-white"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 bg-surface rounded-b-xl shadow-lg py-4 px-4 mx-4 mt-2 z-40 dark:bg-gray-800">
          <div className="flex flex-col gap-3 font-medium">
            <Button
              variant="brutal"
              className="text-lg bg-secondary-background py-2 text-left dark:bg-gray-600 dark:text-white"
              asChild
            >
              <Link
                href="/allAnimes"
                className="px-4"
                onClick={() => setMenuOpen(false)}
              >
                All Animes
              </Link>
            </Button>
            <Button
              variant="brutal"
              className="text-lg bg-secondary-background py-2 text-left dark:bg-gray-600 dark:text-white"
              asChild
            >
              <Link
                href="https://github.com/shridmishra/animeflix"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4"
                onClick={() => setMenuOpen(false)}
              >
                <span>Give a Star</span>
                <FaGithub />
              </Link>
            </Button>
            <Button
              variant="brutal"
              className="text-lg bg-secondary-background py-2 text-left dark:bg-gray-600 dark:text-white"
              asChild
            >
              <Link
                href="https://shrid.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4"
                onClick={() => setMenuOpen(false)}
              >
                
                <FaUser />
              </Link>
            </Button>
            <div className="px-4 py-2 flex items-center justify-center gap-3 text-lg font-normal">
             CHANGE MODE: <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;