import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import UserPhoto from "../Fragments/UserPhoto";
import SidebarLink from "../Fragments/SidebarLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface DashboardLayoutProps {
  children: React.ReactNode;
  hover: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  hover,
}) => {
  const [nav, setNav] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  const openNavHandler = () => setNav(true);
  const closeNavHandler = () => setNav(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setNav(false);
    }
  };

  useEffect(() => {
    if (nav) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [nav]);

  return (
    <main className="w-full h-screen bg-primary">
      <div className="container flex justify-between h-full mx-auto border">
        {/* Navbar Mobile */}
        <nav
          ref={navRef}
          id="navbarMobile"
          className={`md:hidden absolute ${
            nav ? "translate-x-0" : "translate-x-[-100%]"
          } bg-white w-full max-w-[250px] h-full top-0 left-0 px-8 py-5 shadow-md transition-all duration-300`}
        >
          {/* Logo */}
          <Image
            src="/assets/login/mknows_logo.png"
            alt="logo"
            width={100}
            height={100}
          />
          {/* Photo & Username */}
          <UserPhoto />
          <hr className="my-5 border-b-2 rounded-full" />

          {/* Sidebar Link */}
          <SidebarLink hover={hover} />
          <div className="absolute flex space-x-3 bottom-5 left-10">
            <Image
              src="/assets/dashboard/sidebarNavbar/logout-1.png"
              alt="exit-icon"
              width={20}
              height={0}
              className="scale-90"
            />
            <span>Keluar</span>
          </div>
        </nav>

        {/* Hamburger Icon to Open Nav */}
        {!nav && (
          <Bars3Icon
            onClick={openNavHandler}
            className="w-[1.8rem] absolute top-5 right-5 text-ijoToska md:hidden"
          />
        )}

        {/* X Icon to Close Nav */}
        {nav && (
          <XMarkIcon
            onClick={closeNavHandler}
            className="w-[2rem] absolute top-5 right-5 text-ijoToska md:hidden"
          />
        )}

        {/* Sidebar Desktop*/}
        <nav className="w-full max-w-[280px] bg-white p-5 shadow hidden md:block relative">
          {/* Logo */}
          <Image
            src="/assets/login/mknows_logo.png"
            alt="logo"
            width={100}
            height={100}
          />

          {/* Photo & Username */}
          <UserPhoto />
          <hr className="my-5 border-b-2 rounded-full" />

          {/* Sidebar Link */}
          <SidebarLink hover={hover} />
          <Link href="#" className="absolute flex space-x-3 bottom-5 left-10">
            <Image
              src="/assets/dashboard/sidebarNavbar/logout-1.png"
              alt="exit-icon"
              width={20}
              height={0}
              className="scale-75"
            />
            <span>Keluar</span>
          </Link>
        </nav>

        {/* Content */}
        <section className="w-full max-w-3xl p-5 xl:max-w-6xl overflow-y-scroll">
          <div
            // className={`w-full bg-white border rounded-md`}
            className={`w-full bg-white border rounded-md ${
              hover === "/dashboard" ? "max-w-5xl" : ""
            }`}
          >
            {children}
          </div>
        </section>
      </div>
    </main>
  );
};

export default DashboardLayout;
