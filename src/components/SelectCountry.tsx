import React, { useEffect, useState } from "react";
import { country } from "../countryStore";
import { useStore } from "@nanostores/react";

const SelectCountry = () => {
  const countries = ["NZ", "US", "CN"];
  const $country = useStore(country);

  const handleSelectChange = (event: any) => {
    country.set(event.target.value);
  };

  return (
    <div className="flex items-center">
      <h1>Country/Region:</h1>
      <select
        className="select w-fit max-w-xs uppercase text-xs"
        onChange={handleSelectChange}
      >
        {countries.map((country) => (
          <option key={country}>{country}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectCountry;
