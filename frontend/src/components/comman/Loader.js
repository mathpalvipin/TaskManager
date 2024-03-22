import { useEffect } from 'react';
import classes from './comman.module.css'

const Loader =({text})=>{
 
    useEffect(()=>{
        console.log("loading Loader")
    })
  return (
    <>
    <div className={classes.loading_overlay}>
      
    <div className={classes.loadertext}>{text}    </div> <div className={classes.loader}></div>
    </div> 
    </>
  )
}

export default Loader;