import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

const Modal = function ({
  categories,
  opening,
  index,
  data = null,
  heading,
  submitLabel,
}) {
  const { flash, errors } = usePage().props;
  const daysDefault = [
    { id: 1, name: "Monday" },
    { id: 2, name: "Tuesday" },
    { id: 3, name: "Wednesday" },
    { id: 4, name: "Thursday" },
    { id: 5, name: "Friday" },
    { id: 6, name: "Saturday" },
    { id: 7, name: "Sunday" },
  ];
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState();
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(opening);
  const [endTime, setEndTime] = useState("");
  const [days, setDays] = useState([]);

  const [oldStartTime, setOldStartTime] = useState("");
  const [oldEndTime, setOldEndTime] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [buttonType, setButtonType] = useState("create");
  
		  
  
  function handleSubmit(e) {
    e.preventDefault();
    const newRoutine = {
      title,
	    description,
      category_id: category,
      start_time: startTime,
      end_time: endTime,
      days,
      oldStartTime,
      oldEndTime
    };

    if (buttonType == "update") {
    newRoutine.id = id;
		router.put(route("routines.update", { id: newRoutine.id }), newRoutine);
		setButtonType('create')
    } else {
      router.post(route("routines.store"), newRoutine);
    }

    setIsSubmit(true);
  }

  useEffect(() => {
    if (data) {
      setId(data.id);
      setTitle(data.title);
      setCategory(data.category_id);
      setDescription(data.description);
      setStartTime(data.start_time);
      setEndTime(data.end_time);
      setDays(JSON.parse(data.days));

      setOldStartTime(data.start_time);
      setOldEndTime(data.end_time);

      const categories = document.querySelector("#categories").options;
      const daysDOM = document.querySelectorAll(
        `#my_modal_5[index="${index}"] #days`
      );

      const category = categories[data.category_id];
      category.selected = true;

      daysDOM.forEach((day) => {
        if (data.days.includes(day.value)) {
          day.checked = true;
        }
      });

      setButtonType("update");
    }

    if (flash.message && isSubmit && !errors) {
      setTitle("");
      setCategory();
      setDescription("");
      setStartTime("");
      setEndTime("");
      setDays([]);

      const isCheckeds = document.querySelectorAll(
        `#my_modal_5[index="${index}"] #days`
      );
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
  }, [data]);

  return (
    <>
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle text-2xl"
        index={index}
      >
        <div className="modal-box bg-main">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {flash.message && (
            <div className="alert alert-success h-9 py-1 my-3">
              <svg
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
          <h3 className="font-bold text-6xl mb-6 text-center text-title">{heading}</h3>
          <form action="" method="post" onSubmit={handleSubmit}>
            <ul className="">
              <li className="pb-3">
                <div className="form-control w-full">
                  <input
                    type="text"
                    placeholder="Title"
                    className="input input-sm input-bordered border-slate-400 outline-slate-400 bg-slate-100 text-sub-desc focus:border-slate-400 focus:ring-slate-400 placeholder-slate-400"
                    name="title"
                    value={title}
					defaultValue="nilai 1"
                    onChange={(e) => setTitle(e.target.value)}
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
                    className="select select-sm py-0 input-bordered border-slate-400 outline-slate-400 bg-slate-100 text-sub-desc focus:border-slate-400 focus:ring-slate-400 placeholder-slate-400"
                    name="category_id"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option disabled selected value="0">
                      Category
                    </option>
                    {categories &&
                      categories.map((category) => {
                        return (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        );
                      })}
                  </select>
                  <label className="label">
                    {errors.category_id && (
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
                    className="textarea textarea-sm textarea-bordered w-full input-bordered border-slate-400 outline-slate-400 bg-slate-100 text-sub-desc focus:border-slate-400 focus:ring-slate-400 placeholder-slate-400"
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                    <span className="label-text ml-2 text-desc">Start Time</span>
                  </label>
                  <input
                    type="time"
                    className="input input-sm input-bordered border-slate-400 outline-slate-400 bg-slate-100 text-sub-desc focus:border-slate-400 focus:ring-slate-400 placeholder-slate-400"
                    name="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
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
                    <span className="label-text ml-2 text-desc">End Time</span>
                  </label>
                  <input
                    type="time"
                    className="input input-sm input-bordered border-slate-400 outline-slate-400 bg-slate-100 text-sub-desc focus:border-slate-400 focus:ring-slate-400 placeholder-slate-400"
                    name="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
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
                              className="checkbox checkbox-sm border-slate-400 outline-slate-400 bg-slate-100 text-sub-desc focus:border-slate-400 focus:ring-slate-400 placeholder-slate-400"
                              name="days"
                              value={dayDefault.name}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setDays([...days, e.target.value]);
                                } else {
                                  setDays(
                                    days.filter((day) => day !== e.target.value)
                                  );
                                }
                              }}
                            />
                            <span className="label-text ml-2">
                              {dayDefault.name}
                            </span>
                          </label>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                {errors.days && (
                  <div className="text-start">
                    <small className="text-red-600">{errors.days}</small>
                  </div>
                )}
              </li>
              <div className="modal-action justify-center w-full">
                <button
                  className="btn btn-sm w-[450px] border-0 bg-second hover:bg-orange-500 text-main text-xl"
                  type="submit"
                  data-action={buttonType}
                >
                  {submitLabel}
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
