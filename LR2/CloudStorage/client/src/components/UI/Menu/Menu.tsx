import classes from "./Menu.module.css";
import Menubar from "./Menubar/Menubar";

type Props = {
  isInFolder: boolean;
  currentPath: string;
  pathCallback: React.Dispatch<React.SetStateAction<string>>;
  theme: boolean;
  changeTheme: React.Dispatch<React.SetStateAction<boolean>>;
  setFileList: React.Dispatch<React.SetStateAction<{}>>;
  setNewFolderName: React.Dispatch<React.SetStateAction<string>>;
  isSearchClicked: boolean;
  setNewSearchState: React.Dispatch<React.SetStateAction<boolean>>;
  setItemToSearch: React.Dispatch<React.SetStateAction<string>>;
};

const Menu = ({
  isInFolder,
  currentPath,
  pathCallback,
  theme,
  changeTheme,
  setFileList,
  setNewFolderName,
  isSearchClicked,
  setNewSearchState,
  setItemToSearch,
}: Props) => {
  return (
    <div className={classes.menu}>
      <div className={classes.menu__items}>
        <Menubar
          isInFolder={isInFolder}
          currentPath={currentPath}
          setNewPath={pathCallback}
          theme={theme}
          changeTheme={changeTheme}
          setFileList={setFileList}
          setNewFolderName={setNewFolderName}
          setItemToSearch={setItemToSearch}
          setNewSearchState={setNewSearchState}
          isSearchClicked={isSearchClicked}
        />
      </div>
    </div>
  );
};

export default Menu;
