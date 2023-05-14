import "../search.css";
import cl from "./Search.module.css";

type Props = {
  isNewFolderClicked: boolean;
  setNewSearchState: React.Dispatch<React.SetStateAction<boolean>>;
};

const Search = ({ isNewFolderClicked, setNewSearchState }: Props) => {
  return (
    <div className={cl.search_icon}>
      <i
        className="gg-search"
        onClick={() => {
          if (!isNewFolderClicked) {
            setNewSearchState(true);
          }
        }}
      ></i>
    </div>
  );
};

export default Search;
