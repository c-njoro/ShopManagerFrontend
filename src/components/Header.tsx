"use client";
import { useAuth } from "@/context/AuthContext";
import { Home, LogIn, LogOut, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const router = useRouter();
  const [menuClass, setMenuClass] = useState("hide");
  const { isLoading, isLoggedIn, user, logout } = useAuth();

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

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="w-full md:h-full h-[calc(10vh)] flex flex-col  header z-100">
      <div className=" flex md:flex-col flex-row justify-start items-start gap-8 p-4  h-full z-10">
        <div className="logo  w-full overflow-hidden  ">
          <img
            src="/images/echodot.jpg"
            alt="company logo"
            className="md:w-full md:h-full w-50 h-10 object-cover rounded-lg shadow-md "
          />
        </div>
        <div className="w-full links hidden md:flex md:flex-col flex-row gap-8 items-center font-body ">
          <Link
            href="/"
            className="direction w-full h-max flex flex-row gap-4 items-center py-3 px-2 rounded-sm transition-all"
          >
            <Home className="h-5 w-5 " />
            <p>Home</p>
          </Link>

          {isLoggedIn && (
            <Link
              href="/"
              className="direction w-full h-max flex flex-row gap-4 items-center py-3 px-2 rounded-sm transition-all "
            >
              <User className="h-5 w-5 " />
              <p>{user.name}</p>
            </Link>
          )}

          {isLoggedIn && (
            <Link
              href="/new-order"
              className="direction w-full h-max flex flex-row gap-4 items-center py-3 px-2 rounded-sm transition-all "
            >
              <ShoppingCart className="h-5 w-5 " />
              <p>Make Order</p>
            </Link>
          )}

          <ThemeToggle />

          {isLoggedIn ? (
            <button
              className="direction w-full h-max flex flex-row gap-4 items-center py-3 px-2 rounded-sm transition-all"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              <LogOut className="h-5 w-5 " />
              <p>Log Out</p>
            </button>
          ) : (
            <Link
              href="/login"
              className="direction w-full h-max flex flex-row gap-4 items-center py-3 px-2 rounded-sm transition-all"
            >
              <LogIn className="h-5 w-5 " />
              <p>Login</p>
            </Link>
          )}
        </div>

        <div className="drop-down md:hidden cursor-pointer mr-4 flex justify-center flex-row items-center gap-4">
          <ThemeToggle />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10"
            onClick={toggleDrop}
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
          className="w-screen h-max  grid lg:grid-cols-2 grid-cols-1 text-foreground header"
          id="menu"
        >
          <div className="w-full h-full flex flex-col justify-center ">
            {isLoggedIn && (
              <Link
                href="/"
                className="direction w-full h-max flex flex-row gap-4 items-center py-3 px-2 rounded-sm transition-all "
              >
                <User className="h-5 w-5 " />
                <p>{user.name}</p>
              </Link>
            )}

            <Link
              href="/"
              className="direction w-full h-max flex flex-row gap-4 items-center py-3 px-2 rounded-sm transition-all"
            >
              <Home className="h-5 w-5 " />
              <p>Home</p>
            </Link>

            {isLoggedIn ? (
              <button
                className="direction w-full h-max flex flex-row gap-4 items-center py-3 px-2 rounded-sm transition-all"
                onClick={logout}
              >
                <LogOut className="h-5 w-5 " />
                <p>Log Out</p>
              </button>
            ) : (
              <Link
                href="/login"
                className="direction w-full h-max flex flex-row gap-4 items-center py-3 px-2 rounded-sm transition-all"
              >
                <LogIn className="h-5 w-5 " />
                <p>Login</p>
              </Link>
            )}
            <button
              className="direction w-full h-max flex flex-row gap-4 items-center py-3 px-2 rounded-sm transition-all"
              onClick={toggleDrop}
            >
              <X className="h-5 w-5 " />
              <p>Close</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
