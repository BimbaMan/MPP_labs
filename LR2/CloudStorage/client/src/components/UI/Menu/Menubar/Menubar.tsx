import React, { useState } from "react";
import Arrows from "../../icons/arrows/Arrows/Arrows";
import cl from "./Menubar.module.css";
import UploadFile from "../../icons/files/upload/UploadFile/UploadFile";
import ThemeItem from "../../icons/themes/ThemeItem/ThemeItem";
import NewFolder from "../../icons/files/new-folder/NewFolder/NewFolder";
import FolderNameInput from "../../icons/files/new-folder/FolderNameInput/FolderNameInput";
import Logout from "../../icons/logout/Logout/Logout";
import SearchInput from "../../icons/search/SearchInput/SearchInput";
import Search from "../../icons/search/Search/Search";

type Props = {
  isInFolder: boolean;
  currentPath: string;
  setNewPath: React.Dispatch<React.SetStateAction<string>>;
  theme: boolean;
  changeTheme: React.Dispatch<React.SetStateAction<boolean>>;
  setFileList: React.Dispatch<React.SetStateAction<{}>>;
  setNewFolderName: React.Dispatch<React.SetStateAction<string>>;
  isSearchClicked: boolean;
  setNewSearchState: React.Dispatch<React.SetStateAction<boolean>>;
  setItemToSearch: React.Dispatch<React.SetStateAction<string>>;
};

const Menubar = ({
  isInFolder,
  currentPath,
  setNewPath,
  theme,
  changeTheme,
  setFileList,
  setNewFolderName,
  isSearchClicked,
  setNewSearchState,
  setItemToSearch,
}: Props) => {
  const [isNewFolderClicked, setNewFolderState] = useState(false);
  return (
    <div className={cl.menu_bar}>
      <Arrows
        isInFolder={isInFolder}
        currentPath={currentPath}
        setNewPath={setNewPath}
      />
      {isSearchClicked ? (
        <SearchInput
          setNewSearchState={setNewSearchState}
          setItemToSearch={setItemToSearch}
        />
      ) : (
        <Search
          isNewFolderClicked={isNewFolderClicked}
          setNewSearchState={setNewSearchState}
        />
      )}
      <UploadFile setFileList={setFileList} />
      {isNewFolderClicked ? (
        <FolderNameInput
          newStateOfClicked={setNewFolderState}
          setNewFolderName={setNewFolderName}
        />
      ) : (
        <NewFolder
          isSearchClicked={isSearchClicked}
          newStateOfClicked={setNewFolderState}
        />
      )}
      <ThemeItem theme={theme} changeTheme={changeTheme} />
      <Logout />
    </div>
  );
};

export default Menubar;
