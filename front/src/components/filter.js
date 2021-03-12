import React, { useState } from "react";

const Filter = (props) => {
  const [word, setWord] = useState("");

  const handleSearch = (ev) => {
    setWord(ev.target.value);
  };
  const handleFilter = (ev) => {
    if (ev.code === "Enter") props.handleSearch(word);
  };

  return (
    <div>
      <h2>Filter by: </h2>
      name:{" "}
      <input
        onChange={handleSearch}
        onBlur={handleFilter}
        onKeyPress={handleFilter}
        type="text"
        name="filter"
        value={word}
      />
    </div>
  );
};
export default Filter;
