"use client";

import { HiAnime } from "aniwatch";
import { useEffect, useState } from "react";
import { IoIosPlay } from "react-icons/io";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import { Header } from "@/components/common/Header";
import { getEstimatedScheduleByDate } from "@/actions";

type EstimatedSchedule =
  HiAnime.ScrapedEstimatedSchedule["scheduledAnimes"][number];

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

function ScheduleItem({
  schedule,
  index,
  isExpanded
}: {
  schedule: EstimatedSchedule;
  index: number;
  isExpanded:boolean
}) {
  return (
    <div
      key={schedule.id}
      className={`border-b border-white-10 py-3 justify-between brightness-75 hover:brightness-100 cursor-pointer ${index >= (5) && !isExpanded ? 'hidden' : 'flex'}`}
    >
      <div className="flex gap-4">
        <p className="font-light">{schedule.time}</p>
        <p className="font-bold">{schedule.name}</p>
      </div>
      <button className="flex px-4 justify-center items-center gap-1 rounded-md text-sm">
        <IoIosPlay />
        <p>Episode</p>
        <p>{schedule.episode}</p>
      </button>
    </div>
  );
}

export function EstimatedSchedule() {
  const [weekList, setWeekList] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduleList, setScheduelList] = useState<EstimatedSchedule[]>([]);

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const week = getWeekByDate(new Date());
    setWeekList(week);
  }, []);

  useEffect(() => {
    async function fetchScheduel(date: Date) {
      const scheduel = await getEstimatedScheduleByDate(selectedDate);
      setScheduelList(scheduel.scheduledAnimes);
    }
    fetchScheduel(selectedDate);
  }, [selectedDate]);

  return (
    <div className="w-full h-full">
      <Header title={"Estimated Schedule"} />
      <div className="flex gap-3 my-4 mb-6 overflow-x-scroll md:overflow-hidden">
        {weekList.map((date: Date, index: number) => {
          const { day, month, dayOfWeek } = getFormattedDate(date);
          const isSelectedDate = day === getFormattedDate(selectedDate).day;
          return (
            <button
              key={index}
              className={`flex grow flex-col px-4 py-2 bg-[#0f0f11] items-center justify-center rounded-md ${
                isSelectedDate && "bg-primary text-black"
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
        {scheduleList.map((schedule: EstimatedSchedule, index: number) => <ScheduleItem key={schedule.id} schedule={schedule} index={index} isExpanded={isExpanded} /> )}
      </div>
      <div className={`w-full justify-end mt-6 ${scheduleList.length > 5 ? 'flex':'hidden'}`}>
        <button
          className="flex justify-center items-center gap-1 text-white brightness-75 hover:brightness-100"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>{isExpanded ? "Show less" : "Show more"}</span>
          {isExpanded ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </button>
      </div>
    </div>
  );
}
