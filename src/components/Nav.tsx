import React from "react";

import config from "../data/config.json";

import logoImg from "../assets/images/logo.jpg";
import logoTextImg from "../assets/images/logoText.png";

import Cart from "./Cart";

interface Props {
  token: string;
}

const Nav = ({ token }: Props) => {
  const leftItems = [
    {
      name: "about",
      url: "/about",
    },
    {
      name: "contact",
      url: "/contact",
    },
  ];

  const rightItems = [
    {
      name: "lookbook",
      url: "/lookbook",
    },
  ];

  return (
    <nav className="px-4 py-4">
      <div className="grid grid-cols-3 items-center w-full justify-between  max-lg:hidden">
        <div className="flex items-center gap-16">
          <a className="text-2xl bold" href="/">
            <img
              src={logoTextImg.src}
              width={200}
              height={200}
              alt="text logo"
              className="w-32 min-w-32 object-cover"
            />
          </a>
          {leftItems.map((leftItem) => (
            <a href={leftItem.url} className="uppercase">
              {leftItem.name}
            </a>
          ))}
        </div>

        <a href="/" className="mx-auto">
          <img
            src={logoImg.src}
            alt="logo"
            width={200}
            height={200}
            className="w-16 object-cover"
          />
        </a>

        <div className="flex items-center gap-16 justify-end">
          {rightItems.map((rightItem) => (
            <a href={rightItem.url} className="uppercase">
              {rightItem.name}
            </a>
          ))}
          <Cart token={token} />
        </div>
      </div>

      <div className="lg:hidden flex w-full justify-between items-center">
        <a href="/">
          <img
            src={logoTextImg.src}
            alt="text logo"
            className="w-32 object-cover"
          />
        </a>
        <div className="flex items-center gap-2">
          <Cart token={token} />
          <button className="border-2 p-1 rounded-md border-black">MENU</button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
