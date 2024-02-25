 import classes from "./ErrorBox.module.css"
const ErrorBox = (props)=>{
 const Error =props.message;

 return(
    <div className={classes.overlays}>
        <div className={classes.errorbox}>
            <div className={classes.errormessage}>{Error}</div>
        </div>
    </div>
 )
}
export default ErrorBox;