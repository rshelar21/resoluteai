import React, { useState, useEffect } from "react";
import { selectTask } from "../../feature/taskSlice";
import { useSelector } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../firebase";

const UpdateModal = ({ setOpenModal }) => {
  const updateTask = useSelector(selectTask);
  const [updateForm, setUpdateForm] = useState({
    taskName: updateTask?.taskName,
    description: updateTask?.description,
    date: updateTask?.date,
  });
  const [fadeEffect, setFadeEffect] = useState("");

  const closeModal = () => {
    setFadeEffect("fade-out");
    setTimeout(() => {
      document.body.style.overflow = "visible";
      setOpenModal(false);
    }, 300);
  };

  const openModal = () => {
    document.querySelector("body").style.overflow = "hidden";
    setFadeEffect("fade-in");
    setOpenModal(true);
  };

  useEffect(() => {
    if (updateTask) {
      openModal();
    } else {
      closeModal();
    }
  }, [updateTask]);

  const handlerCloseModal = () => {
    setOpenModal(false);
  };

  const handlerSubmitTask = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "tasks", updateTask?.id);
    await updateDoc(docRef, {
      taskName: updateForm.taskName,
      description: updateForm.description,
      date: updateForm.date,
    });
    setOpenModal(false);
  };

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <>
      <div className="w-full fixed inset-0 z-50 backdrop-blur-sm bg-gray-50 bg-opacity-40 flex justify-center items-center">
        <div
          className={`bg-white p-4 rounded-md w-full max-w-lg shadow-xl ${fadeEffect}`}
        >
          <div className="flex justify-end" onClick={handlerCloseModal}>
            <XMarkIcon className="hover:bg-gray-300 icon" />
          </div>

          <div>
            <h1 className="text-center font-medium text-lg">Update Task</h1>
          </div>
          <form
            className="flex flex-col relative w-full"
            onSubmit={handlerSubmitTask}
          >
            <input
              type="text"
              placeholder="Task Name"
              className="input my-6"
              name="taskName"
              value={updateForm.taskName}
              onChange={handlerChange}
            />
            <input
              type="text"
              placeholder="Description"
              className="input"
              name="description"
              value={updateForm.description}
              onChange={handlerChange}
            />

            <input
              type="date"
              placeholder="Select Submission Date"
              className="input mt-6"
              name="date"
              value={updateForm.date}
              onChange={handlerChange}
            />

            <button className="button" type="submit">
              Update Task
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateModal;
