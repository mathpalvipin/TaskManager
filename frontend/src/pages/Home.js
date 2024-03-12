import classes from "./home.module.css";
import { useState } from "react";
import ShowTask from "../components/Task/ShowTask";
import Calender from "../components/comman/Calender";

const Home = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div>
      <div
        className={`${classes.CalenderContainer} 
       fixed right-0  z-50 flex h-full w-full flex-col justify-center bg-cyan-300  sm:w-3/6 `}
      >
        <Calender
          currentDate={currentDate}
          changeCurrentDate={setCurrentDate}
        ></Calender>
      </div>
      <div>
        <div>
          <div
            className={`${classes.showContainer} 
        left-0 z-10 w-3/6 `}
          >
            <ShowTask
              currentDate={currentDate}
             
            ></ShowTask>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
