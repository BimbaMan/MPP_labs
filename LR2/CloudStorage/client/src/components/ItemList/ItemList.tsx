import FolderItem from "../FolderItem/FolderItem";
import FileItem from "../FileItem/FileItem";
import cl from "./ItemList.module.css";

type Props = {
  currentPath: string;
  items: any[];
  searchedItems: any[];
  setNewPath: React.Dispatch<React.SetStateAction<string>>;
  setItemToRemove: React.Dispatch<React.SetStateAction<string>>;
  isSearchClicked: boolean;
  setFileNameToDownload: React.Dispatch<React.SetStateAction<string>>;
};

const ItemList = ({
  currentPath,
  items,
  searchedItems,
  setNewPath,
  setItemToRemove,
  isSearchClicked,
  setFileNameToDownload,
}: Props) => {
  const itemList = isSearchClicked ? searchedItems : items;
  return (
    <div className={cl.item_list_block}>
      {itemList.map((item: any) =>
        item.dir ? (
          <FolderItem
            folderName={item.name}
            currentPath={currentPath}
            itemPath={item.path}
            setItemToRemove={setItemToRemove}
            setNewPath={setNewPath}
            isSearchClicked={isSearchClicked}
            key={item.name + Date.now()}
          />
        ) : (
          <FileItem
            fileName={item.name}
            itemPath={item.path}
            fileSize={item.size}
            setItemToRemove={setItemToRemove}
            setFileNameToDownload={setFileNameToDownload}
            isSearchClicked={isSearchClicked}
            key={item.name + Date.now()}
          />
        )
      )}
    </div>
  );
};

export default ItemList;
