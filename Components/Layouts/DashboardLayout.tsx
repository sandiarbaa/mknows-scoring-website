import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import UserPhoto from "../Fragments/UserPhoto";
import SidebarLink from "../Fragments/SidebarLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

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
      <div className="container mx-auto border flex justify-between h-full">
        {/* Navbar Mobile */}
        <nav
          ref={navRef}
          id="navbarMobile"
          className={`absolute ${
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
          <hr className="border-b-2 my-5 rounded-full" />
          {/* Sidebar Link */}
          <SidebarLink hover={hover} />
        </nav>
        {!nav && (
          <Bars3Icon
            onClick={openNavHandler}
            className="w-[1.8rem] absolute top-5 right-5 text-ijoToska md:hidden"
          />
        )}
        {nav && (
          <XMarkIcon
            onClick={closeNavHandler}
            className="w-[2rem] absolute top-5 right-5 text-ijoToska md:hidden"
          />
        )}
        {/* Sidebar */}
        <nav className="w-full max-w-[280px] bg-white p-5 shadow hidden md:block">
          {/* Logo */}
          <Image
            src="/assets/login/mknows_logo.png"
            alt="logo"
            width={100}
            height={100}
          />
          {/* Photo & Username */}
          <UserPhoto />
          <hr className="border-b-2 my-5 rounded-full" />
          {/* Sidebar Link */}
          <SidebarLink hover={hover} />
        </nav>
        {/* Content */}
        <section className="w-full max-w-3xl xl:max-w-6xl bg-primary p-5">
          <div className="bg-white border w-full rounded-md">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default DashboardLayout;
