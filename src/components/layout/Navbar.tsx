"use client"
import React, { useEffect } from "react";
import ThemeToggle from "../ThemeToggle";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [show, setShow] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > 50 && window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between brutal py-4 px-8 mx-8 lg:mx-28 mt-2 lg:mt-8  rounded-xl bg-surface transform transition-transform duration-300 overflow-visible ${
        show ? "translate-y-0" : "-translate-y-28"
      }`}
    >
      

      <div className="flex justify-center items-center gap-4 relative">
        {/* ICON: absolute but allowed to overflow and animate */}
      <div className="absolute -top-9 -left-6 z-50 pointer-events-none ">
        <Image
          src="/icons/good.png"
          width={75}
          height={75}
          alt="good anime icon"
            className="block animate-upside-pendulum "
        />
      </div>
        <Link href="/" passHref>
          <Button variant="brutal" className="text-xl font-semibold bg-surface-3 pl-12 border-b-4 ">
            AnimeFlix
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex gap-3 font-medium">
          <Link href="/" className="text-xl">
            Popular
          </Link>
          <Link href="/admin" className="text-xl tracking-tighter">
            Latest
          </Link>
        </div>
        <Button variant="brutal" className="text-xl bg-secondary-background">
          Give a Star <FaGithub />
        </Button>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
