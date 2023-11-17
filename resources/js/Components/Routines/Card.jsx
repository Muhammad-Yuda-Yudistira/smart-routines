import { Link } from "@inertiajs/react";
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
    <div className="chat chat-start w-full text-black text-start">
      <div className="chat-header">
        <time className="text-sm opacity-50">{routine.start_time}</time>
      </div>
      <div className="chat-bubble p-8 py-4 min-w-44">
        <div className="badge badge-secondary">{routine.category.name}</div>
        <h2 className="text-xl font-bold">{routine.title}</h2>
        <p>{routine.description}</p>
        <p className="text-xs">{newTime}</p>
      </div>
    </div>
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
      <Modal categories={categories} opening={opening} index={index} />
    </>
  );
}
