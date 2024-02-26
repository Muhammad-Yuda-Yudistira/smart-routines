import { Link } from "@inertiajs/react";
import { useState } from "react";
import Card from "./Card";

export default function List({ routines, user, categories }) {
  let startPoint = [];
  let endPoint = [];
  let startedPoint = [];

  if(routines.length > 0) 
  {
    routines.map((routine) => {
    startPoint = [...startPoint, routine.start_time];
    endPoint = [...endPoint, routine.end_time];
    });

    startedPoint = convertTimeToMinute(startPoint[0]);
    startedPoint = convertToHuman(startedPoint);

  }

  return (
    <>
      <ul className="steps steps-vertical w-full text-slate-300">
        {startPoint[0] != "00:00:00" && routines.length > 0 ? (
          <li className="step step-neutral" data-content="!" key="0">
            <Card
              opening="00:00"
              categories={categories}
              newTime={startedPoint}
            />
          </li>
        ) :
        (
          <li className="step step-neutral" data-content="!" key="0">
            <Card
              opening="00:00"
              categories={categories}
              newTime={startedPoint}
            />
          </li>
        )
        }
        {routines.length > 0 &&
          routines.map((routine, index) => {
            index = index + 1;
            // waktu dalam menit
            const startInMinute = convertTimeToMinute(
              routine.start_time,
              "start"
            );
            const endInMinute = convertTimeToMinute(routine.end_time, "end");
            // selisihnya
            const newMinute = minuteDifference(startInMinute, endInMinute);
            // ubah untuk UI ke format hour minute
            const newTime = convertToHuman(newMinute);

            // untuk card kosong
            let emptyCardTime;
            if (!startPoint.includes(routine.end_time)) {
              let emptyCardEndTime = startPoint[index];
              if (emptyCardEndTime) {
                let emptyCardInMinute = convertTimeToMinute(
                  emptyCardEndTime,
                  "end"
                );
                emptyCardTime = convertToHuman(emptyCardInMinute - endInMinute);
              } else {
                emptyCardTime = convertTimeToMinute("24:00:00") - endInMinute;
                emptyCardTime = convertToHuman(emptyCardTime);
              }
            }
            return (
              <>
                <li className="step step-neutral font-tersier" data-content="★" key={index}>
                  <Card
                    routine={routine}
                    days={routine.days}
                    index={index}
                    newTime={newTime}
                    categories={categories}
                  />
                </li>
                {!startPoint.includes(routine.end_time) &&
                  routine.end_time !== "00:00:00" && (
                    <li className="step step-neutral" data-content="!" key={routines.length + index}>
                      <Card
                        opening={routine.end_time}
                        newTime={emptyCardTime}
                        categories={categories}
                        index={routines.length + index}
                      />
                    </li>
                  )}
              </>
            );
          })}
        <div className="step step-neutral font-tersier" data-content="●">
          <p className="text-lg text-slate-500 opacity-9">00:00</p>
        </div>
        {!routines && <li className="step step-neutral" data-content="!" key="0">
          <Card
            newTime="24 hours 0 minute"
            categories={categories}
          />
        </li>}
      </ul>
    </>
  );
}

function convertTimeToMinute(time, position) {
  let [hour, minute, second] = time.split(":").map(Number);
  if (position == "end" && hour == "00") {
    hour = "24";
  }
  const inMinutes = Math.floor(hour * 60 + minute + second / 60);
  return inMinutes;
}
function minuteDifference(minuteStart, minuteEnd) {
  if(minuteEnd < minuteStart)
  {
    // 24 - A = 1 jam + B = 4 jam
    return (1440 - minuteStart) + minuteEnd
  } else {
    return minuteEnd - minuteStart;
  }
}
function convertToHuman(minute) {
  let hour = minute / 60;
  let newMinute = (hour % 1) * 60;
  hour = Math.floor(hour);
  newMinute = Math.floor(newMinute);

  return hour + " " + "Hour" + " " + newMinute + " " + "Minute";
}
