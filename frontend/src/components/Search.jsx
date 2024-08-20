import React from "react";

function Search() {
  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Search blog"
        className="input input-bordered w-full max-w-xs"
      />
    </div>
  );
}

export default Search;
