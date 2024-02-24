import { useEffect } from 'react';
import classes from './Loader.module.css'

const Loader =()=>{
 
    useEffect(()=>{
        console.log("loading Loader")
    })
  return (
    <>
    <div className={classes.loading_overlay}>
    <div className={classes.loader}></div>
    </div> 
    </>
  )
}

export default Loader;