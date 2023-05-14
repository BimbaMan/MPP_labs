import cl from "./Errors.module.css";

const Errors = ({ errorsList }: any) => {
  let i = -1;
  return (
    <div className={cl.errors}>
      {errorsList.map((error: any) => {
        i++;
        return (
          <p key={i}>
            Error {i + ":"} {error}
          </p>
        );
      })}
    </div>
  );
};

export default Errors;
