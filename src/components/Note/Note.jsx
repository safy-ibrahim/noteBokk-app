import React, { useEffect, useState } from "react";
import style from "./Note.module.css";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import axios from "axios";

export default function Note({ note, deleteFn, noteID, getFn }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function updateNote(values) {
    await axios
      .put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${noteID}`,
        values,
        {
          headers: {
            token: `3b8ny__${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        values.title=''
        values.content=""

        getFn();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        handleClose();
      });
  }

  let formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: updateNote,
  });

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
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
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="col-md-4">
        <Card>
          <Card.Body>
            <Card.Title>{note.title}</Card.Title>

            <Card.Text>{note.content}</Card.Text>
            <Card.Link>
              <i
                className="fa-regular fa-pen-to-square"
                variant="primary"
                onClick={handleShow}
              ></i>
            </Card.Link>
            <Card.Link>
              <i
                className="fa-solid fa-trash"
                onClick={() => {
                  deleteFn(note._id);
                }}
              ></i>
            </Card.Link>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
