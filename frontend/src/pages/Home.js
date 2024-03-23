import classes from "./home.module.css";
import {  useState } from "react";
import ShowTask from "../components/Task/ShowTask";
import Calender from "../components/comman/Calender";

const Home = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
 
  return (
    <div  className={classes.HomeContainer}>
      <div
        className={`${classes.CalenderContainer} 
       fixed right-0  z-10 flex h-full w-full flex-col justify-center bg-cyan-300  sm:w-3/6  md:w-4/6  xl:w-5/6`}
      >
        <Calender
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        ></Calender>
      </div>
     
       
          <div
            className={`${classes.showContainer} 
       fixed  left-0 z-10 w-full sm:w-3/6  md:w-2/6 xl:w-1/6 `}
          >
            <ShowTask
              currentDate={currentDate}
             
            ></ShowTask>
          </div>
        </div>
      
   
  );
};
export default Home;
