import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

const CountryInput = ({ setCountry, country }) => {
  const options = useMemo(() => countryList().getData(), []);
  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#4E9BFF" : "#fffff",
        color: isFocused ? "white" : "black",
        cursor: isDisabled ? "not-allowed" : "default",
      };
    },
  };

  return (
    <Select
      options={options}
      onChange={(value) => setCountry(value)}
      defaultValue={country}
      styles={colourStyles}
      name="country"
    />
  );
};

export default CountryInput;
