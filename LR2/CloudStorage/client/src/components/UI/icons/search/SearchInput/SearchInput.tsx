import cl from "./SearchInput.module.css";

type Props = {
  setNewSearchState: React.Dispatch<React.SetStateAction<boolean>>;
  setItemToSearch: React.Dispatch<React.SetStateAction<string>>;
};

function handler(
  setNewSearchState: React.Dispatch<React.SetStateAction<boolean>>,
  setItemToSearch: React.Dispatch<React.SetStateAction<string>>
) {
  const inp = document.getElementById("searchInput") as HTMLInputElement;
  inp.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      setItemToSearch(inp.value);
    } else if (e.key === "Escape") {
      setNewSearchState(false);
    }
  });
}

const SearchInput = ({ setNewSearchState, setItemToSearch }: Props) => {
  return (
    <div>
      <input
        id="searchInput"
        className={cl.search_input}
        onClick={() => handler(setNewSearchState, setItemToSearch)}
      ></input>
    </div>
  );
};

export default SearchInput;
