import classes from "./comman.module.css";
import { useAuth } from "../../context/AuthContext.js";
const ErrorBox = ({message}) => {
  const { setError } = useAuth();

  const handlerClose = () => {
    setError(null);
  };

  return (
    <div className={classes.overlays}>
      <div className={classes.errorbox}>
        <div className={classes.errormessage}>{message}</div>
        <button onClick={handlerClose}> close</button>
      </div>
    </div>
  );
};
export default ErrorBox;
