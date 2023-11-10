import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

const Modal = function ({ categories, opening, index }) {
    const { flash, errors } = usePage().props;
    const daysDefault = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState();
    const [description, setDescription] = useState("");
    const [startTime, setStartTime] = useState(opening);
    const [endTime, setEndTime] = useState("");
    const [days, setDays] = useState([]);

    const [isSubmit, setIsSubmit] = useState(false);

    if (errors.length == 0 && isSubmit) {
        setTitle("");
        setCategory(0);
        setDescription("");
        setStartTime("");
        setEndTime("");
        setDays([]);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newRoutine = {
            title,
            category,
            description,
            start_time: startTime,
            end_time: endTime,
            days,
        };
        router.post(route("routines.store"), newRoutine);

        setIsSubmit(true);
    }

    useEffect(() => {
        if (flash.message && isSubmit) {
            setTitle("");
            setCategory();
            setDescription("");
            setStartTime("");
            setEndTime("");
            setDays([]);

            const isCheckeds = document.querySelectorAll("#days");
            const categoriesDOM = document.querySelector("#categories");

            isCheckeds.forEach((isChecked) => {
                isChecked.checked = false;
            });

            const selected = categoriesDOM.options;
            for (let i = 0; i < selected.length; i++) {
                selected[i].selected = false;
            }
            selected[0].selected = true;

            setIsSubmit(false);
        } else {
            return;
        }
    });

    return (
        <>
            <dialog
                id="my_modal_5"
                className="modal modal-bottom sm:modal-middle"
                index={index}
            >
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    {flash.message && (
                        <div className="alert alert-success h-9 py-1 my-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current shrink-0 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{flash.message}</span>
                        </div>
                    )}
                    <h3 className="font-bold text-3xl mb-6 text-center">
                        New Routines
                    </h3>
                    <form action="" method="post" onSubmit={handleSubmit}>
                        <ul>
                            <li className="pb-3">
                                <div className="form-control w-full">
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        className="input input-sm input-bordered"
                                        name="title"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                    <label className="label">
                                        {errors.title && (
                                            <span className="label-text-alt text-red-600">
                                                {errors.title}
                                            </span>
                                        )}
                                    </label>
                                </div>
                            </li>
                            <li className="pb-3">
                                <div className="form-control w-full">
                                    <select
                                        id="categories"
                                        className="select select-sm py-0 select-bordered"
                                        name="category"
                                        value={category}
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }
                                    >
                                        <option disabled selected value="0">
                                            Category
                                        </option>
                                        {categories &&
                                            categories.map(
                                                (category, index) => {
                                                    return (
                                                        <option
                                                            key={category.id}
                                                            value={category.id}
                                                        >
                                                            {category.name}
                                                        </option>
                                                    );
                                                }
                                            )}
                                    </select>
                                    <label className="label">
                                        {errors.category && (
                                            <span className="label-text-alt text-red-600">
                                                {errors.category}
                                            </span>
                                        )}
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-control">
                                    <textarea
                                        className="textarea textarea-sm textarea-bordered w-full"
                                        placeholder="Description"
                                        name="description"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    ></textarea>
                                    <label className="label">
                                        {errors.description && (
                                            <span className="label-text-alt text-red-600">
                                                {errors.description}
                                            </span>
                                        )}
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text ml-2">
                                            Start Time
                                        </span>
                                    </label>
                                    <input
                                        type="time"
                                        className="input input-sm input-bordered w-full"
                                        name="startTime"
                                        value={startTime}
                                        onChange={(e) =>
                                            setStartTime(e.target.value)
                                        }
                                    />
                                    <label className="label">
                                        {errors.start_time && (
                                            <span className="label-text-alt text-red-600">
                                                {errors.start_time}
                                            </span>
                                        )}
                                    </label>
                                </div>
                            </li>
                            <li className="pb-3">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text ml-2">
                                            End Time
                                        </span>
                                    </label>
                                    <input
                                        type="time"
                                        className="input input-sm input-bordered w-full"
                                        name="endTime"
                                        value={endTime}
                                        onChange={(e) =>
                                            setEndTime(e.target.value)
                                        }
                                    />
                                    <label className="label">
                                        {errors.end_time && (
                                            <span className="label-text-alt text-red-600">
                                                {errors.end_time}
                                            </span>
                                        )}
                                    </label>
                                </div>
                            </li>
                            <li>
                                <ul className="flex flex-wrap justify-between">
                                    {daysDefault.map((dayDefault) => {
                                        return (
                                            <li>
                                                <div className="form-control w-28">
                                                    <label className="label cursor-pointer justify-start">
                                                        <input
                                                            id="days"
                                                            type="checkbox"
                                                            className="checkbox checkbox-sm"
                                                            name="days"
                                                            value={dayDefault}
                                                            onChange={(e) => {
                                                                const addDay =
                                                                    e.target
                                                                        .value;
                                                                if (
                                                                    e.target
                                                                        .checked
                                                                ) {
                                                                    setDays([
                                                                        ...days,
                                                                        addDay,
                                                                    ]);
                                                                } else {
                                                                    setDays(
                                                                        days.filter(
                                                                            (
                                                                                day
                                                                            ) =>
                                                                                day !==
                                                                                addDay
                                                                        )
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                        <span className="label-text ml-2">
                                                            {dayDefault}
                                                        </span>
                                                    </label>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                                {errors.days && (
                                    <div className="text-start">
                                        <small className="text-red-600">
                                            {errors.days}
                                        </small>
                                    </div>
                                )}
                            </li>
                            <div className="modal-action justify-center w-full">
                                <button
                                    className="btn btn-secondary btn-sm w-[450px]"
                                    method="submit"
                                >
                                    Add
                                </button>
                            </div>
                        </ul>
                    </form>
                </div>
            </dialog>
        </>
    );
};

export default Modal;
