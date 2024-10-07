import React, { useState } from "react";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form role="search">
      <input
        type="search"
        className="form-control form-control-sm"
        placeholder="Search templates..."
        aria-label="Search"
        value={query}
        onChange={handleSearch}
      />
    </form>
  );
};

export default SearchBar;
