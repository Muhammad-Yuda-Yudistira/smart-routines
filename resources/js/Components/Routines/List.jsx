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

    console.log("start:", startPoint);
    console.log("end:", endPoint);

    let startedPoint = convertTimeToMinute(startPoint[0]);
    startedPoint = convertToHuman(startedPoint);

    return (
        <>
            <ul className="steps steps-vertical w-full">
                {startPoint[0] !== "00:00:00" && (
                    <li className="step" key="0">
                        <Card
                            newTime={startedPoint}
                            opening="00:00"
                            categories={categories}
                        />
                    </li>
                )}
                {routines &&
                    routines.map((routine, index) => {
                        console.log("end time:", routine.end_time);
                        index = index + 1;
                        // waktu dalam menit
                        const startInMinute = convertTimeToMinute(
                            routine.start_time
                        );
                        const endInMinute = convertTimeToMinute(
                            routine.end_time
                        );
                        // selisihnya
                        const newMinute = minuteDifference(
                            startInMinute,
                            endInMinute
                        );
                        // ubah untuk UI ke format hour minute
                        const newTime = convertToHuman(newMinute);

                        // untuk card kosong
                        let newPointTime;
                        if (!endPoint.includes(routine.start_time)) {
                            const startPointInMinute = convertTimeToMinute(
                                routine.end_time
                            );
                            if (startPoint[index]) {
                                const endPointInMinute = convertTimeToMinute(
                                    startPoint[index]
                                );
                                // // selisihnya
                                const newPointMinute = minuteDifference(
                                    startPointInMinute,
                                    endPointInMinute
                                );
                                // // ubah untuk UI ke format hour minute
                                newPointTime = convertToHuman(newPointMinute);
                            } else {
                                const newPointMinute =
                                    1440 - startPointInMinute; //1440 = 24 jam in minute
                                newPointTime = convertToHuman(newPointMinute);
                            }
                        }
                        return (
                            <>
                                <li className="step" key={index}>
                                    <Card
                                        routine={routine}
                                        index={index}
                                        newTime={newTime}
                                    />
                                </li>
                                {!startPoint.includes(routine.end_time) &&
                                    routine.end_time !== "12:00:00" && (
                                        <li
                                            className="step"
                                            key={routines.length + index}
                                        >
                                            <Card
                                                opening={routine.end_time}
                                                newTime={newPointTime}
                                                categories={categories}
                                                index={routines.length + index}
                                            />
                                        </li>
                                    )}
                            </>
                        );
                    })}
                <div className="step">00:00</div>
            </ul>
        </>
    );
}

function convertTimeToMinute(time) {
    const [hour, minute, second] = time.split(":").map(Number);
    if (hour == "12" || (hour == "00" && minute == "00" && second == "00")) {
        return 1440;
    } else {
        const inMinutes = Math.floor(hour * 60 + minute + second / 60);
        return inMinutes;
    }
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
