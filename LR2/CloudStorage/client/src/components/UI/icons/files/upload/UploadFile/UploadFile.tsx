import React from "react";
import "../upload.css";
import cl from "./UploadFile.module.css";

type Props = {
  setFileList: React.Dispatch<React.SetStateAction<{}>>;
};

const handler = (
  e: any,
  setFileList: React.Dispatch<React.SetStateAction<{}>>
) => {
  setFileList(e.target.files[0]);
};

const createInput = (setFileList: React.Dispatch<React.SetStateAction<{}>>) => {
  const inp = document.createElement("input") as HTMLInputElement;
  inp.setAttribute("type", "file");
  inp.onchange = (e) => handler(e, setFileList);
  inp.click();
  inp.remove();
};

const UploadFile = ({ setFileList }: Props) => {
  return (
    <div className={cl.upload}>
      <i
        onClick={() => createInput(setFileList)}
        className="gg_software_upload"
      ></i>
    </div>
  );
};

export default UploadFile;
