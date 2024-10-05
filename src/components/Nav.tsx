import React, { useEffect, useState } from "react";

import config from "../data/config.json";

import logoImg from "../assets/images/logo.png";
import logoTextImg from "../assets/images/logoText.png";

import Cart from "./Cart";

interface Props {
  token: string;
}

const Nav = ({ token }: Props) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const leftItems = [
    {
      name: "campaign",
      url: "/campaign",
    },
    {
      name: "contact",
      url: "/contact",
    },
  ];

  const rightItems = [

  ];

  const bodyElement = document.getElementsByTagName("body")[0];

  useEffect(() => {
    if (showMobileMenu) {
      bodyElement.classList.add("max-h-screen");
      bodyElement.classList.add("overflow-hidden");
    } else {
      bodyElement.classList.remove("max-h-screen");
      bodyElement.classList.remove("overflow-hidden");
    }
  }, [showMobileMenu]);

  return (
    <nav
      className={`px-4 py-4 z-50 ${showMobileMenu ? "fixed w-full" : "sticky"
        } top-0`}
    >
      <div className="grid grid-cols-3 items-center w-full justify-between max-lg:hidden text-xs">
        <div className="flex items-center gap-8">
          <a href="/">
            <img
              src={logoTextImg.src}
              width={200}
              height={200}
              alt="text logo"
              className="w-32 min-w-32 object-cover"
            />
          </a>
          {leftItems.map((leftItem) => (
            <a
              href={leftItem.url}
              className="uppercase link link-hover"
              key={leftItem.name}
            >
              {leftItem.name}
            </a>
          ))}
        </div>

        <a href="/" className="mx-auto">
          <img
            src={logoImg.src}
            alt="logo"
            width={500}
            height={500}
            className="w-16 object-cover"
          />
        </a>

        <div className="flex items-center gap-8 justify-end">
          {/* {rightItems.map((rightItem) => (
            <a
              href={rightItem.url}
              className="uppercase link link-hover"
              key={rightItem.name}
            >
              {rightItem.name}
            </a>
          ))} */}
          <Cart token={token} />
        </div>
      </div>

      <div className="lg:hidden flex w-full justify-between items-center z-50 relative">
        <a href="/">
          <img
            src={logoTextImg.src}
            alt="text logo"
            width={500}
            height={500}
            className="w-32 object-cover"
          />
        </a>
        <div className="flex items-center gap-2">
          <Cart token={token} />
          <button
            className={`border-2 p-1 rounded-md border-black ${showMobileMenu ? "bg-black text-white" : ""
              }`}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            MENU
          </button>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 right-0 md:hidden bottom-0 bg-white ${showMobileMenu ? "" : "hidden"
          }`}
      >
        <div className="flex flex-col gap-4 py-4 mt-16 ml-6">
          {leftItems.map((leftItem) => (
            <a
              href={leftItem.url}
              className="uppercase link link-hover"
              key={leftItem.name}
            >
              {leftItem.name}
            </a>
          ))}
          {rightItems.map((rightItem) => (
            <a
              href={rightItem.url}
              className="uppercase link link-hover"
              key={rightItem.name}
            >
              {rightItem.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
