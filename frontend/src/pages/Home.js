import classes from "./home.module.css";
import { useState } from "react";
import ShowTask from "../components/Task/ShowTask";
import Calender from "../components/comman/Calender";
import { getMonth, getYear } from "date-fns";
const Home = () => {
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const month = getMonth(currentDate) + 1;
  const year = getYear(currentDate);
  const yearmonth = year + "-" + month;
  return (
    <>
      <div className="flex h-full w-full mt-3">
        <div className={` w-3/6 h-full    mx-8 }`}>
          <ShowTask
            currentDate={currentDate}
            yearmonth={yearmonth}
            setCurrentDate={setCurrentDate}
          ></ShowTask>
        </div>
        <div className=" flex h-full w-3/6 flex-col mx-8">
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
            <div className="rounded-xl text-xs px-2 py-1 mr-2 mb-1 h-fit bg-yellow-50 text-yellow-800  tracking-wider"> Monthly Recurring  0</div>
            <div className="rounded-xl text-xs px-2 py-1 mr-2 mb-1 h-fit tracking-wider bg-green-50 text-green-800 "> Yearly Recurring  0</div>
            <div className="rounded-xl text-xs px-2 py-1 mr-2 mb-1 h-fit tracking-wider bg-red-50 text-red-800 "> Weekly Recurring  0</div>
            <div className="rounded-xl text-xs px-2 py-1 mr-2 mb-1 h-fit tracking-wider bg-purple-50 text-purple-800 "> Birthday 0</div>
            </div> 

          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
