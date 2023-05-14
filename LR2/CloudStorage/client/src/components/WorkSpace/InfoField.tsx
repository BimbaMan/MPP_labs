import Errors from "../Errors/Errors";
import ItemList from "../ItemList/ItemList";

type Props = {
  errorMessageList: string[];
  items: any[];
  searchedItems: any[];
  currentPath: string;
  setItemToRemove: React.Dispatch<React.SetStateAction<string>>;
  setFileNameToDownload: React.Dispatch<React.SetStateAction<string>>;
  isSearchClicked: boolean;
  setNewPath: React.Dispatch<React.SetStateAction<string>>;
};

const InfoField = ({
  errorMessageList,
  items,
  searchedItems,
  currentPath,
  setItemToRemove,
  setFileNameToDownload,
  isSearchClicked,
  setNewPath,
}: Props) => {
  const notNullErrorMessageList: any[] = [];
  for (let i = 0; i < errorMessageList.length; i++) {
    if (errorMessageList[i]) {
      notNullErrorMessageList.push(errorMessageList[i]);
    }
  }
  return (
    <div>
      {notNullErrorMessageList.length != 0 ? (
        <Errors errorsList={notNullErrorMessageList} />
      ) : (
        <ItemList
          items={items}
          searchedItems={searchedItems}
          currentPath={currentPath}
          setItemToRemove={setItemToRemove}
          setFileNameToDownload={setFileNameToDownload}
          setNewPath={setNewPath}
          isSearchClicked={isSearchClicked}
        />
      )}
    </div>
  );
};

export default InfoField;
