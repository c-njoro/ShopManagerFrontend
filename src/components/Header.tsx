"use client";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const router = useRouter();
  const [menuClass, setMenuClass] = useState("hide");
  const { isLoading, isLoggedIn, user } = useAuth();

  const toggleDrop = () => {
    if (menuClass === "hide") {
      setMenuClass("menu-show");
    } else {
      setMenuClass("hide");
    }
  };

  useEffect(() => {
    // Set menu to hide on route change
    setMenuClass("hide");
  }, [router.asPath]);

  return (
    <div className="w-screen h-[calc(7vh)] flex flex-col  header">
      <div className=" flex flex-row justify-between p-4 items-center w-[calc(100vw)] h-[calc(7vh)] fixed z-10">
        <div className="logo  p-0 w-1/5 min-w-52 h-full">
          <Image
            src={`https://images.pexels.com/photos/2763246/pexels-photo-2763246.jpeg`}
            alt="shop logo"
            width={200}
            height={200}
            className="w-full h-full object-cover"
          ></Image>
        </div>
        <div className="links hidden md:flex flex-row gap-8 items-center font-body pr-8">
          <Link href="/" className="link   px-4 py-1 ">
            Home
          </Link>

          {isLoggedIn ? (
            <p>Hello, {user.name}</p>
          ) : (
            <Link href="/login" className="link-sign">
              Login
            </Link>
          )}
          <ThemeToggle />
        </div>

        <div
          className="drop-down md:hidden cursor-pointer mr-8 flex justify-center flex-row items-center gap-8"
          onClick={toggleDrop}
        >
          <ThemeToggle />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </div>

      <div className={`${menuClass}`}>
        <div
          className="w-screen h-[calc(100vh)]  grid lg:grid-cols-2 grid-cols-1 text-foreground header"
          id="menu"
        >
          <div className="w-full h-full flex flex-col justify-center items-center gap-8 relative">
            <Link
              href="/"
              className="link font-body font-semibold tracking-wide px-4 py-1  w-full flex flex-row justify-center items-center"
            >
              Home
            </Link>

            {isLoggedIn ? (
              <p>Hello, {user.name}</p>
            ) : (
              <Link
                href="/sign"
                className="link-sign link text-orange-950 font-body font-semibold tracking-wide px-4 py-1  w-full flex flex-row justify-center items-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
