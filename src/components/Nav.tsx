import React from "react";

import config from "../data/config.json";

import Cart from "./Cart";

const Nav = () => {
  return (
    <nav className="flex items-center w-full justify-between px-4 py-4">
      <a className="text-2xl bold" href="/">
        {config.businessName}
      </a>
      <Cart />
    </nav>
  );
};

export default Nav;
