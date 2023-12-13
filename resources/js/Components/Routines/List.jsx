import { Link } from "@inertiajs/react";
import { useState } from "react";
import Card from "./Card";

export default function List({ routines, user, categories }) {
  let startPoint = [];
  let endPoint = [];
  routines.map((routine) => {
    startPoint = [...startPoint, routine.start_time];
    endPoint = [...endPoint, routine.end_time];
  });

  let startedPoint = convertTimeToMinute(startPoint[0]);
  startedPoint = convertToHuman(startedPoint);

  return (
    <>
      <ul className="steps steps-vertical w-full text-slate-300">
        {startPoint[0] !== "00:00:00" && (
          <li className="step" key="0">
            <Card
              opening="00:00"
              categories={categories}
              newTime={startedPoint}
            />
          </li>
        )}
        {routines &&
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
                <li className="step" key={index}>
                  <Card
                    routine={routine}
                    index={index}
                    newTime={newTime}
                    categories={categories}
                  />
                </li>
                {!startPoint.includes(routine.end_time) &&
                  routine.end_time !== "00:00:00" && (
                    <li className="step" key={routines.length + index}>
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
        <div className="step text-red-800" style={{fontFamily:'Smooch Sans'}}>
          <p className="text-lg text-slate-500 opacity-9">00:00</p>
        </div>
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
  return minuteEnd - minuteStart;
}
function convertToHuman(minute) {
  let hour = minute / 60;
  let newMinute = (hour % 1) * 60;
  hour = Math.floor(hour);
  newMinute = Math.floor(newMinute);

  return hour + " " + "Hour" + " " + newMinute + " " + "Minute";
}
