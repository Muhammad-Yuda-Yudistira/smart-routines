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
      <div className="chat chat-start w-full text-black text-start flex-1">
        <div className="chat-header">
          <time className="text-sm opacity-50">{routine.start_time}</time>
        </div>
        <div className="chat-bubble p-8 py-4 min-w-44">
          <div className="badge badge-secondary mb-3">
            {routine.category.name}
          </div>
          <h2 className="text-xl font-bold">{routine.title}</h2>
          <p>{routine.description}</p>
          <p className="text-xs">{newTime}</p>
          <div className="action flex gap-1 pt-3">
            <button
              id="open-modal"
              className="badge badge-accent"
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
              className="badge badge-secondary"
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
      <div className="chat chat-start text-black">
        <div className="chat-header">
          <time className="text-sm opacity-50">{opening}</time>
        </div>
        <div className="chat-bubble p-8 py-4 w-48 text-start">
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn btn-secondary btn-sm w-full"
            id="open-modal"
            onClick={handleModalBox}
            index={index}
          >
            Add
          </button>
          <p className="text-xs">{newTime}</p>
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
