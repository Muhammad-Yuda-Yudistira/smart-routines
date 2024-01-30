import { Link, router } from "@inertiajs/react";
import Modal from "@/Components/Routines/Modal";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Card({
  routine = null,
  days = null,
  index = 0,
  newTime,
  opening = null,
  categories = null,
}) {
  days = JSON.parse(days)

  function handleModalBox(e) {
    const keyModal = e.target.getAttribute("index");
    document.querySelector(`#my_modal_5[index="${keyModal}"]`).showModal();
  }
  return routine !== null ? (
    <>
      <div id={routine.id} className="chat chat-start w-full text-black text-start flex-1 font-tersier">
        <div className="chat-header pl-4">
          <time className="text-lg opacity-50 text-slate-500">{routine.start_time}</time>
        </div>
        <div className="chat-bubble p-8 py-4 min-w-44 bg-white shadow-md shadow-slate-300">
          <div className="badge bg-slate-300 text-slate-500 mb-3 text-xl rounded-sm py-3 border-0">
            {routine.category.name}
          </div>
          <div>
            {days.map(day => {
              return(
                  <div className="badge badge-neutral bg-slate-300 text-slate-500 border-none mr-1 rounded-none">{day}</div>
                )
            })}
          </div>
          <h2 className="text-4xl font-medium text-second">{routine.title}</h2>
          <p className="text-xl text-slate-500">{routine.description}</p>
          <p className="text-sm text-slate-400">{newTime}</p>
          <div className="action flex gap-1 pt-3">
            <button
              id="open-modal"
              className="badge bg-second text-main border-0"
              onClick={handleModalBox}
              index={routine.id}
            >
              Edit
            </button>
            <Link
              as="button"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                Swal.fire({
                  title: "Are you sure?",
                  text: "Delete this...",
                  confirmButtonText: "Yes, delete it!",
                  showCancelButton: true,
                  confirmButtonColor: "#ea580c",
                  cancelButtonColor: "#64748b",
                }).then(result => {
                    if(result.isConfirmed) {
                      router.delete(route("routines.destroy", {id: routine.id}));
                    }
                })
                // if (confirm("Are you sure?")) {
                //   router.delete(route("routines.destroy", { id: routine.id }));
                // }
              }}
              className="badge bg-second text-main border-0"
            >
              Delete
            </Link>
          </div>
        </div>
      </div>
      <Modal
        categories={categories}
        opening={opening}
        index={routine.id}
        data={routine}
        heading="Edit Routine"
        submitLabel="Update"
      />
    </>
  ) : (
    <>
      <div className="chat chat-start text-black font-tersier">
        <div className="chat-header">
          <time className="text-lg opacity-50 pl-4 text-slate-500">{opening}</time>
        </div>
        <div className="chat-bubble p-8 py-4 w-48 text-start relative bg-transparent">
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn border-none outline-0 bg-white text-second hover:bg-white btn-sm w-full text-lg relative z-20"
            id="open-modal"
            onClick={handleModalBox}
            index={index}
          >
            Add
          </button>
          <p className="text-sm text-center text-main pt-1 relative z-20">{newTime}</p>
          <div id="bg-glassmorphism" className="absolute w-full h-full top-0 left-0 bg-clip bg-second blur-sm"></div>
        </div>
      </div>
      <Modal
        categories={categories}
        opening={opening}
        index={index}
        heading="New Routine"
        submitLabel="Create"
      />
    </>
  );
}
