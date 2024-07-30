import classes from "./home.module.css";
import { useEffect, useState } from "react";
import ShowTask from "../components/Task/ShowTask";
import Calender from "../components/comman/Calender";
import { getMonth, getYear } from "date-fns";
import Counter from "../components/Task/Counter";
const Home = () => {
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const month = getMonth(currentDate) + 1;
  const year = getYear(currentDate);
  const yearmonth = year + "-" + month;
  
  return (
    <>
      <div className="flex  md:flex-row flex-col-reverse h-full w-full mt-3">
        <div className={`md:w-3/6 w-full h-full  px-4  md:mx-8 }`}>
          <ShowTask
            currentDate={currentDate}
            yearmonth={yearmonth}
            setCurrentDate={setCurrentDate}
          ></ShowTask>
        </div>
        <div className=" flex h-full md:w-3/6 w-full flex-col mx-1 md:mx-8">
          <div className="h-5/6 w-auto">
            <Calender
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              yearmonth={yearmonth}
            ></Calender>
          </div>
          <div
            className={` 
            h-1/6  w-auto my-2 mx-3 flex flex-col  `}
          >
      
           <div className="h-8 flex w-auto items-center text-2xl leading-5 font-bold font-sans">Monthly Task Count</div> 
           <div className="font-body h-[calc(100%-3rem)] w-auto mt-2 flex flex-wrap">
         <Counter></Counter>
            </div> 

          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
