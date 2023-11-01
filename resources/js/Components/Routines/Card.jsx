import { Link } from "@inertiajs/react";

export default function Card({
    routine = null,
    index = null,
    newTime,
    closing = null,
}) {
    return index !== null ? (
        <div
            className="chat chat-start w-full text-black text-start"
            key={index}
        >
            <div className="chat-header">
                <time className="text-sm opacity-50">{routine.start_time}</time>
            </div>
            <div className="chat-bubble">
                <div className="badge badge-secondary">
                    {routine.category.name}
                </div>
                <h2 className="text-xl font-bold">{routine.title}</h2>
                <p>{routine.description}</p>
                <p className="text-xs">{newTime}</p>
            </div>
        </div>
    ) : (
        <div className="chat chat-start text-center text-black" key={index}>
            <div className="chat-header">
                <time className="text-sm opacity-50">{closing}</time>
            </div>
            <div className="chat-bubble w-full">
                <p>None</p>
                <Link href="#" as="button" className="btn btn-secondary btn-sm">
                    Add
                </Link>
                <p className="text-xs">{newTime}</p>
            </div>
        </div>
    );
}
