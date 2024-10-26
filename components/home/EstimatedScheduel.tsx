"use client";


// import { getEstimatedScheduleByDate } from "actions";
import { getEstimatedScheduleByDate } from "@/app/actions";
import { useEffect, useState } from "react";
import { FaRegPlayCircle } from "react-icons/fa";

function getWeekByDate(date: Date) {
  const day = date.getDay();
  let array = [];

  for (let i = 0; i < 7; i++) {
    if (i - day != 0) {
      let days = i - day;
      let newDate = new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
      array.push(newDate);
    } else {
      array.push(date);
    }
  }

  return array;
}

function getFormattedDate(date: Date) {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const dayOfWeek = date.toLocaleString("default", { weekday: "short" });

  return {
    day: day,
    month: month,
    dayOfWeek: dayOfWeek,
  };
}

export function EstimatedSchedule() {
  const [weekList, setWeekList] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduleList, setScheduelList] = useState([]);

  useEffect(() => {
    const week = getWeekByDate(new Date());
    setWeekList(week);
  }, []);

  useEffect(() => {
    async function fetchScheduel(date: Date) {
      const scheduel = await getEstimatedScheduleByDate(selectedDate);
      setScheduelList(scheduel.scheduledAnimes);
      console.log(scheduel.scheduledAnimes);
    }
    fetchScheduel(selectedDate);
  }, [selectedDate]);

  return (
    <div className="w-full h-full p-3">
      <div className="inline-flex gap-2 items-stretch mb-4">
        <div className="flex-grow w-2 bg-purple-500 rounded-full"></div>
        <p className="text-2xl font-bold">Estimated Schedule</p>
      </div>
      <div className="w-[90%] mx-auto">
        <div className="flex gap-3 my-4 mb-6">
          {weekList.map((date: Date, index: number) => {
            const { day, month, dayOfWeek } = getFormattedDate(date);
            const isSelectedDate = day === getFormattedDate(selectedDate).day;
            return (
              <button
                key={index}
                className={`flex grow flex-col px-4 py-2 bg-[#0f0f11] items-center justify-center rounded-md ${
                  isSelectedDate && "bg-purple-500 text-black"
                }`}
                onClick={() => setSelectedDate(date)}
              >
                <h3 className="font-bold">{dayOfWeek}</h3>
                <div
                  className={`flex gap-2 text-sm ${
                    isSelectedDate ? " text-black" : "text-gray-400"
                  }`}
                >
                  <p>{month}</p>
                  <p>{day}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-4 ">
          {scheduleList.map((schedule: any, index: number) => {
            return (
              <div key={schedule.id} className="flex border-b border-white-10 py-3 justify-between brightness-75 hover:brightness-100 cursor-pointer">
                <div className="flex gap-4">
                   <p className="font-light">{schedule.time}</p>
                   <p className="font-bold">{schedule.name}</p>
                </div>
                <button className="flex px-4 justify-center items-center gap-2 bg-[#0f0f11] rounded-md text-sm">
                    <FaRegPlayCircle />
                    <p>Episode</p>
                    <p>{schedule.episode}</p>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
