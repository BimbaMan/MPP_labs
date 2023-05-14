import "../folder-add.css";
import cl from "./NewFolder.module.css";

type Props = {
  newStateOfClicked: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchClicked: boolean;
};

const NewFolder = ({ newStateOfClicked, isSearchClicked }: Props) => {
  return (
    <div className={cl.new_folder}>
      <i
        className="gg-folder-add"
        onClick={() => {
          if (!isSearchClicked) {
            newStateOfClicked(true);
          }
        }}
      ></i>
    </div>
  );
};

export default NewFolder;
