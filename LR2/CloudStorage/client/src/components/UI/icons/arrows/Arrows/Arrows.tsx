import "../left-arrow/chevron-left-o.css";
import "./Arrows.module.css";

type Props = {
  isInFolder: boolean;
  currentPath: string;
  setNewPath: React.Dispatch<React.SetStateAction<string>>;
};

const Arrows = ({ isInFolder, currentPath, setNewPath }: Props) => {
  return (
    <div
      className={isInFolder ? "in_folder" : "not_in_folder"}
      onClick={() => setNewPath(currentPath.replace(/(\/[^\/]+).$/, "/"))}
    >
      <span>
        <i className="gg-chevron-left-o"></i>
      </span>
    </div>
  );
};

export default Arrows;
