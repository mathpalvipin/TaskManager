import { useEffect } from 'react';
import classes from './comman.module.css'

const Loader =({text})=>{
 
    useEffect(()=>{
        console.log("loading Loader")
    })
  return (
    <>
    <div className={classes.loading_overlay}>
      
    {text}    <div className={classes.loader}></div>
    </div> 
    </>
  )
}

export default Loader;