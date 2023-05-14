import classes from "./Path.module.css";

type Props = {
  rootPath: string;
};

const Path = ({ rootPath }: Props) => {
  return (
    <div className={classes.path__block}>
      <div className={classes.rootpath}>{rootPath ? rootPath : "/"}</div>
    </div>
  );
};

export default Path;
