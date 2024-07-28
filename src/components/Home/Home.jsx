import React, { useEffect, useState } from "react";
import style from "./Home.module.css";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import axios from "axios";
import Note from "../Note/Note";
import { useRecoilState } from "recoil";
import { noteAtom } from "../../Atoms/noteAtom";

export default function Home() {
  let [notesLength, setNotesLength] = useRecoilState(noteAtom);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let [noteError, setNoteError] = useState("");

  let [notes, setNotes] = useState();

  async function addNote(values) {
    await axios
      .post(`https://note-sigma-black.vercel.app/api/v1/notes`, values, {
        headers: {
          token: `3b8ny__${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res?.data?.msg == "done") {
          values.title = "";
          values.content = "";
          getNotes();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        handleClose();
      });
  }

  async function getNotes() {
    setNoteError(null)
    await axios
      .get(`https://note-sigma-black.vercel.app/api/v1/notes`, {
        headers: {
          token: `3b8ny__${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        setNotes(res?.data?.notes);
        setNotesLength(res?.data?.notes.length);
      })
      .catch((err) => {
        console.log(err);
        setNoteError(err?.response?.data?.msg);
        setNotesLength(0)
      });
  }

  async function deleteNote(noteID) {
    await axios
      .delete(`https://note-sigma-black.vercel.app/api/v1/notes/${noteID}`, {
        headers: {
          token: `3b8ny__${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        getNotes();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  let formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: addNote,
  });

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              placeholder="Note title"
              value={formik.values.title}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <textarea
              name="content"
              id="content"
              className="form-control my-2"
              style={{ resize: "none" }}
              placeholder="Note Content"
              value={formik.values.content}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            ></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <button
        className=" btn bg-primary text-white d-block ms-auto"
        variant="primary"
        onClick={handleShow}
      >
        <i className="fa-solid fa-plus me-2 "></i>
        Add Note
      </button>

      {noteError ? (
        <h4>{noteError}</h4>
      ) : (
        <>
          <h2 className="mb-4">Notes</h2>
          <div className="row g-4">
            {notes?.map((note) => {
              return (
                <Note key={note._id} noteID={note._id} note={note} deleteFn={deleteNote} getFn={getNotes} ></Note>
              );
            })}
          </div>
          <h6 className="my-3 text-end">Notes Number : {notesLength}</h6>
        </>
      )}
    </>
  );
}
