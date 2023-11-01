import { Link } from "@inertiajs/react";
import { useState } from "react";
import Card from "./Card";

export default function List({ routines, user }) {
    const [today, setToday] = useState("23:59:00"); //1439

    let startPoint = [];
    let endPoint = [];
    routines.map((routine) => {
        startPoint = [...startPoint, routine.start_time];
        endPoint = [...endPoint, routine.end_time];
    });

    let startedPoint = convertTimeToMinute(startPoint[0]);
    startedPoint = convertToHuman(startedPoint);
    let endedPoint = endPoint[endPoint.length - 1];

    return (
        <>
            <ul className="steps steps-vertical w-full">
                {startPoint[0] !== "00:00:00" && (
                    <li className="step">
                        <Card newTime={startedPoint} closing="00:00:00" />
                    </li>
                )}
                {routines &&
                    routines.map((routine, index) => {
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
                            if (startPoint[index + 1]) {
                                const endPointInMinute = convertTimeToMinute(
                                    startPoint[index + 1]
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
                                <li className="step">
                                    <Card
                                        routine={routine}
                                        index={index}
                                        newTime={newTime}
                                    />
                                </li>
                                {!endPoint.includes(routine.start_time) && (
                                    <li className="step">
                                        <Card
                                            closing={endedPoint}
                                            newTime={newPointTime}
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
