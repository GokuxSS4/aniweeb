"use client";

import Link from "next/link";

import { HiAnime } from "aniwatch";
import { useEffect, useState } from "react";
import { IoIosPlay } from "react-icons/io";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import { Header } from "@/components/common/Header";
import { getEstimatedScheduleByDate } from "@/actions";

type EstimatedSchedule =
  HiAnime.ScrapedEstimatedSchedule["scheduledAnimes"][number];

interface WeekContentProps {
  scheduleList: EstimatedSchedule[];
  isExpanded: boolean;
}

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

function WeekItem({
  date,
  isSelected,
  onSelect,
}: {
  date: Date;
  isSelected: boolean;
  onSelect: (date: Date) => void;
}) {
  const { day, month, dayOfWeek } = getFormattedDate(date);

  return (
    <button
      className={`flex grow flex-col px-4 py-2 bg-[#0f0f11] items-center justify-center rounded-md ${
        isSelected ? "bg-primary text-black" : ""
      }`}
      onClick={() => onSelect(date)}
    >
      <h3 className="font-bold">{dayOfWeek}</h3>
      <div
        className={`flex gap-2 text-sm ${
          isSelected ? "text-black" : "text-gray-400"
        }`}
      >
        <p>{month}</p>
        <p>{day}</p>
      </div>
    </button>
  );
}

function ScheduleItem({
  schedule,
  index,
  isExpanded,
}: {
  schedule: EstimatedSchedule;
  index: number;
  isExpanded: boolean;
}) {
  return (
    <Link
      href={`details?animeId=${schedule.id}`}
      className={`border-b border-white-10 py-3 justify-between brightness-75 hover:brightness-100 cursor-pointer ${
        index >= 5 && !isExpanded ? "hidden" : "flex"
      }`}
    >
      <div className="flex gap-4">
        <p className="font-light">{schedule.time}</p>
        <p className="font-bold line-clamp-2">{schedule.name}</p>
      </div>
      <button className="flex px-4 justify-center items-center gap-1 rounded-md text-sm">
        <IoIosPlay />
        <p>Episode</p>
        <p>{schedule.episode}</p>
      </button>
    </Link>
  );
}

function WeekContent({ scheduleList, isExpanded }: WeekContentProps) {
  if (scheduleList.length > 0) {
    return (
      <>
        {scheduleList.map((schedule, index) => (
          <ScheduleItem
            key={schedule.id}
            schedule={schedule}
            index={index}
            isExpanded={isExpanded}
          />
        ))}
      </>
    );
  } else {
    return (
      <div className="text-center pt-4">
        <p className="text-2xl">No Schedule has been Found</p>
      </div>
    );
  }
}

function WeekItemSkeleton() {
  return (
    <div className="flex grow h-16 flex-col px-4 py-2 items-center justify-center rounded-md animate-pulse transform transition-transform duration-500 bg-gray-700"></div>
  );
}

function ScheduleItemSkeleton() {
  return (
    <div className="py-3  w-full h-8 flex justify-between brightness-75 animate-pulse transform transition-transform duration-500 hover:cursor-pointer bg-gray-700 rounded"></div>
  );
}

export function EstimatedSchedule() {
  const [weekList, setWeekList] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduleList, setScheduelList] = useState<EstimatedSchedule[]>([]);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const week = getWeekByDate(new Date());
    setWeekList(week);
    setIsMounted(true);
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
      <div className="grid grid-cols-4  md:flex gap-3 my-4 mb-6 flex-wrap">
        {isMounted
          ? weekList.map((date: Date, index: number) => {
              const { day } = getFormattedDate(date);
              const isSelectedDate = day === getFormattedDate(selectedDate).day;
              return (
                <WeekItem
                  key={index}
                  date={date}
                  isSelected={isSelectedDate}
                  onSelect={setSelectedDate}
                />
              );
            })
          : Array.from({ length: 7 }).map((_, index) => (
              <WeekItemSkeleton key={index} />
            ))}
      </div>

      <div className="flex flex-col gap-4 ">
        {isMounted ? (
          <WeekContent scheduleList={scheduleList} isExpanded={isExpanded} />
        ) : (
          Array.from({ length: 5 }).map((_, index) => (
            <ScheduleItemSkeleton key={index} />
          ))
        )}
      </div>
      <div
        className={`w-full justify-end mt-6 ${
          scheduleList.length > 5 ? "flex" : "hidden"
        }`}
      >
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
