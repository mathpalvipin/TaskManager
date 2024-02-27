import classes from "./ErrorBox.module.css";
import { useAuth } from "../../context/AuthContext.js";
const ErrorBox = (props) => {
  const { setError } = useAuth();
  const Error = props.message;
  const handlerClose = () => {
    setError(null);
  };

  return (
    <div className={classes.overlays}>
      <div className={classes.errorbox}>
        <div className={classes.errormessage}>{Error}</div>
        <button onClick={handlerClose}> close</button>
      </div>
    </div>
  );
};
export default ErrorBox;
