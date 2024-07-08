import { MdSearch } from "react-icons/md";

const Search = ({ handleSearchNote }) => {
  return (
    <>
      <input
        className="search-input"
        onChange={(event) => handleSearchNote(event.target.value)}
        type="text"
        placeholder="search"
      />
      <MdSearch className="search-icons" size="1.3em" />
    </>
  );
};

export default Search;
