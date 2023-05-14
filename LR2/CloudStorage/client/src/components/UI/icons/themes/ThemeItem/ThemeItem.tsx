import "../dark/moon.css";
import "../light/sun.css";
import cl from "./ThemeItem.module.css";

type Props = {
  theme: boolean;
  changeTheme: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThemeItem = ({ theme, changeTheme }: Props) => {
  return (
    <div className={cl.theme} onClick={() => changeTheme(!theme)}>
      <i className={theme ? "gg_sun" : "gg_moon"}></i>
    </div>
  );
};

export default ThemeItem;
