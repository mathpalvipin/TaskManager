// import classes from "./comman.module.css";
import { GrPowerReset } from "react-icons/gr";
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
import CreateTask from "../Task/CreateTask.js"
import { useState } from "react";

const Calender = ({ setCurrentDate, currentDate = new Date() }) => {
  const StartDay = startOfMonth(currentDate);
  const EndDay = endOfMonth(currentDate);
  const noOfDays = differenceInDays(EndDay, StartDay) + 1;
  const [isCreating ,setIsCreating]= useState(false);
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
    {isCreating && <CreateTask currentDate={currentDate} setIsCreating={setIsCreating} setCurrentDate={setCurrentDate} class='z-200'></CreateTask>}
      <div className="flex flex-row justify-evenly items-center">
        <h1> Calender- {format(currentDate, "dd LLLL yyyy")} </h1>
        <GrPowerReset
          onClick={() => setCurrentDate(new Date())}
          className="size-5"
        />
        <button onClick={()=>setIsCreating(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2  m-1 rounded">Create Task</button>

      </div>
      <div class="h-full  bg-cyan-100 ">
        <div className="grid h-full grid-cols-7">
          <Cell onClick={preYear}>{"<<"}</Cell>
          <Cell onClick={preMonth}>{"<"}</Cell>
          <Cell className="col-span-3">{format(currentDate, "LLLL yyyy")}</Cell>
          <Cell onClick={nextMonth}>{">"}</Cell>
          <Cell onClick={nextYear}>{">>"}</Cell>
          {daysofweeks.map((day) => {
            return <Cell>{day}</Cell>;
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
    </>
  );
};

export default Calender;
