export default function List({ routines }) {
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

        return { hour: hour, minute: newMinute };
    }
    return (
        <>
            <ul className="steps steps-vertical">
                {routines.map((routine, index) => {
                    const startInMinute = convertTimeToMinute(
                        routine.start_time
                    );
                    const endInMinute = convertTimeToMinute(routine.end_time);
                    const newMinute = minuteDifference(
                        startInMinute,
                        endInMinute
                    );
                    const newTime = convertToHuman(newMinute);
                    return (
                        <li className="step" key={index}>
                            <div className="chat chat-start text-start w-full">
                                <div className="chat-header">
                                    <time className="text-sm opacity-50">
                                        {routine.start_time}
                                    </time>
                                </div>
                                <div className="chat-bubble">
                                    <div className="badge badge-secondary">
                                        {routine.category.name}
                                    </div>
                                    <h2 className="card-title">
                                        {routine.title}
                                    </h2>
                                    <p>{routine.description}</p>
                                    <p className="text-xs">
                                        {newTime.hour} Hour, {newTime.minute}{" "}
                                        Minute.
                                    </p>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
