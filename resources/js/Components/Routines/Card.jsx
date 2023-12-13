import { Link, router } from "@inertiajs/react";
import Modal from "@/Components/Routines/Modal";
import { useState } from "react";

export default function Card({
  routine = null,
  index = 0,
  newTime,
  opening = null,
  categories = null,
}) {
  function handleModalBox(e) {
    const keyModal = e.target.getAttribute("index");
    document.querySelector(`#my_modal_5[index="${keyModal}"]`).showModal();
  }
  return routine !== null ? (
    <>
      <div className="chat chat-start w-full text-black text-start flex-1" style={{fontFamily:'Smooch Sans'}}>
        <div className="chat-header pl-4">
          <time className="text-lg opacity-50 text-slate-700">{routine.start_time}</time>
        </div>
        <div className="chat-bubble p-8 py-4 min-w-44 bg-teal-900">
          <div className="badge bg-white mb-3 text-xl rounded-sm py-3 border-0">
            {routine.category.name}
          </div>
          <h2 className="text-4xl font-medium text-teal-600">{routine.title}</h2>
          <p className="text-xl">{routine.description}</p>
          <p className="text-sm">{newTime}</p>
          <div className="action flex gap-1 pt-3">
            <button
              id="open-modal"
              className="badge bg-white border-0 hover:bg-gradient-to-t hover:from-slate-500 hover:from-10 hover:via-slate-300 hover:via-20 hover:to-white hover:to-60 hover:text-slate-500"
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
                if (confirm("Are you sure?")) {
                  router.delete(route("routines.destroy", { id: routine.id }));
                }
              }}
              className="badge bg-white border-0 hover:bg-gradient-to-t hover:from-slate-500 hover:from-10 hover:via-slate-300 hover:via-20 hover:to-white hover:to-80 hover:text-slate-500"
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
      <div className="chat chat-start text-black" style={{fontFamily:'Smooch Sans'}}>
        <div className="chat-header">
          <time className="text-lg opacity-50 pl-4 text-slate-600">{opening}</time>
        </div>
        <div className="chat-bubble p-8 py-4 w-48 text-start relative bg-transparent">
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn border-0 bg-white hover:bg-gradient-to-tr hover:from-slate-500 hover:from-10 hover:via-slate-300 hover:via-20 hover:to-white hover:to-80 hover:text-slate-400 btn-sm w-full text-lg relative z-20"
            id="open-modal"
            onClick={handleModalBox}
            index={index}
          >
            Add
          </button>
          <p className="text-sm text-center text-slate-700 pt-1">{newTime}</p>
          <div id="bg-glassmorphism" className="absolute w-full h-full top-0 left-0 bg-clip bg-teal-700/70 blur-sm"></div>
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
