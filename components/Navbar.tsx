import React, { useCallback, useState, useEffect } from "react";
import NavbarItem from "./NavbarItem";
import { BsSearch, BsBell } from "react-icons/bs";
import AccountMenu from "./AccountMenu";
import { useRouter } from "next/router";
const Navbar = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const TOP_OFFSET = 66;
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((show) => !show);
  }, []);
  return (
    <nav className="w-full fixed z-40">
      <div
        className={`
        px-7 sm:px-9 md:px-11 py-6
      flex
      flex-row
      items-center
      transition
      duration-500
      ${showBackground ? "bg-black bg-opacity-80" : ""}
      `}
      >
        <img
          onClick={() => router.push("/")}
          className="w-24   cursor-pointer"
          src="/images/logo.png"
          alt="netflix logo"
        />
        <div className=" flex-row ml-8 gap-7 hidden lg:flex">
          <div onClick={() => router.push("/home")}>
            <NavbarItem label="Home" />
          </div>
          <div onClick={() => router.push("/series")}>
            <NavbarItem label="Series" />
          </div>
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Brows by language" />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>
          <div className="flex items-center flex-row gap-2 cursor-pointer relative">
            <div
              onClick={toggleAccountMenu}
              className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden"
            >
              <img src="/images/default-blue.png" alt="userImage" />
            </div>
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
