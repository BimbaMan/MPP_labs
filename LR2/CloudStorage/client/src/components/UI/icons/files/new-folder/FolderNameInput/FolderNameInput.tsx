import cl from "./FolderNameInput.module.css";

type Props = {
  setNewFolderName: React.Dispatch<React.SetStateAction<string>>;
  newStateOfClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

function handler(
  newStateOfClicked: React.Dispatch<React.SetStateAction<boolean>>,
  setNewFolderName: React.Dispatch<React.SetStateAction<string>>
) {
  const inp = document.getElementById("newFolderInput") as HTMLInputElement;
  inp.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      setNewFolderName(inp.value);
      newStateOfClicked(false);
    } else if (e.key === "Escape") {
      newStateOfClicked(false);
    }
  });
}

const FolderNameInput = ({ newStateOfClicked, setNewFolderName }: Props) => {
  return (
    <div>
      <input
        id="newFolderInput"
        className={cl.new_folder_name}
        onClick={() => handler(newStateOfClicked, setNewFolderName)}
      ></input>
    </div>
  );
};

export default FolderNameInput;
