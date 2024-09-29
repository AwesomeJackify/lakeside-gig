import React, { useEffect, useState } from "react";
import { DEFAULT_COUNTRY } from "../utils";

const SelectCountry = () => {
  const countries = ["NZ", "US", "CN"];
  const currentCountry =
    localStorage.getItem("currentCountry") || DEFAULT_COUNTRY;

  const handleSelectChange = (event: any) => {
    localStorage.setItem("currentCountry", event.target.value);
    localStorage.removeItem("cartId");
    window.location.reload();
  };

  return (
    <div className="flex items-center">
      <h1>Country/Region:</h1>
      <select
        className="select w-fit max-w-xs uppercase text-xs"
        onChange={handleSelectChange}
        value={currentCountry}
      >
        {countries.map((country) => (
          <option key={country}>{country}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectCountry;
