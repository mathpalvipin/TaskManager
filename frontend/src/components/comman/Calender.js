import { MdOutlineArrowForwardIos } from "react-icons/md";
import { TfiControlForward } from "react-icons/tfi";
import { GrPowerReset } from "react-icons/gr";
import { TfiControlBackward } from "react-icons/tfi";
import { MdOutlineArrowBackIos } from "react-icons/md";
import {
  add,
  sub,
  differenceInDays,
  endOfMonth,
  startOfMonth,
  format,
  setDate,
} from "date-fns";
import Cell from "./Cell.js";
import CreateTask from "../Task/CreateTask.js";
import { useState } from "react";

const Calender = ({ setCurrentDate, currentDate = new Date() }) => {
  const StartDay = startOfMonth(currentDate);
  const EndDay = endOfMonth(currentDate);
  const noOfDays = differenceInDays(EndDay, StartDay) + 1;
  const [isCreating, setIsCreating] = useState(false);
  const prefixDays = StartDay.getDay();
  const suffixDays = 6 - EndDay.getDay();
  const preMonth = () => {
    setCurrentDate(sub(currentDate, { months: 1 }));
  };
  const nextMonth = () => {
    setCurrentDate(add(currentDate, { months: 1 }));
  };
  const preYear = () => {
    setCurrentDate(sub(currentDate, { years: 1 }));
  };
  const nextYear = () => {
    setCurrentDate(add(currentDate, { years: 1 }));
  };

  const changeDate = (date) => {
    const newdate = setDate(currentDate, date);
    setCurrentDate(newdate);
  };
  const daysofweeks = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
  return (
    <>
      {isCreating && (
        <CreateTask
          currentDate={currentDate}
          setIsCreating={setIsCreating}
          open= {isCreating}
          setCurrentDate={setCurrentDate}
          class="z-200"
        ></CreateTask>
      )}
      <div className=" flex flex-col h-full w-auto ">
      <div className="flex items-center justify-between mx-3 bg-white h-12 ">
       <div className="flex justify-center items-center "> 
        <h1 className="text-2xl  leading-5 mr-2 items-center  font-bold font-sans">{format(currentDate, "dd  LLLL  yyyy")} </h1>
        <button
          onClick={() => setIsCreating(true)}
          className="m-2 md:m-1 rounded-md  px-1 py-1 text-sm sm:text-md md:text-lg bg-primary-500  text-white hover:bg-primary-600"
        >
          Create Task
        </button>
        </div>
       
        <div className="cursor-pointer flex">
        <GrPowerReset className="m-1 size-4 hover:scale-110 "
          onClick={() => setCurrentDate(new Date())}
          
        />
        <span className="m-1 hover:scale-110 " onClick={preYear}><TfiControlBackward /></span>
        <span className="m-1 hover:scale-110" onClick={preMonth}><MdOutlineArrowBackIos /></span>
        <span className="m-1 hover:scale-110" onClick={nextMonth}><MdOutlineArrowForwardIos /></span>
        <span className="m-1 hover:scale-110"onClick={nextYear}><TfiControlForward /></span>
        </div>
      </div>
      <div class="h-[calc(100%-3rem)] w-auto border-2 mx-3 mb-3 rounded-md shadow-md ">
        <div className="grid h-full grid-cols-7 ">
          {daysofweeks.map((day) => {
            return <Cell className="text-primary-500 font-bold">{day}</Cell>;
          })}
          {Array.from({ length: prefixDays }).map((_, index) => {
            return <Cell key={index}></Cell>;
          })}
          {Array.from({ length: noOfDays }).map((_, index) => {
            const date = index + 1;
            const isActive = currentDate.getDate() === date;

            return (
              <Cell
                key={date}
                isActive={isActive}
                onClick={() => changeDate(date)}
                              >
                {date}
              </Cell>
            );
          })}

          {Array.from({ length: suffixDays }).map((_, index) => {
            return <Cell key={index}></Cell>;
          })}
        </div>
      </div>
      </div>
      </>
  );

};

export default Calender;
