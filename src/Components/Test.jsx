import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { SetError } from "../Redux/Reducer/AppReducer";

const Test = () => {
  let ref = useRef(null);
  const dispatch = useDispatch();
  const [todos, setTodos] = useState([]);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3010/todo")
      .then((p) => p.json())
      .then((d) => setTodos(d))
      .catch((e) => dispatch(SetError(e)));
  }, []);

  const Post = () => {
    if (ref.current.value) {
      fetch("http://localhost:3010/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo: ref.current.value }),
      })
        .then((p) => p.json())
        .then((data) => {
          setTodos((ld) => [...ld, data]);
          ref.current.value = "";
        })
        .catch((e) => dispatch(SetError(e)));
    }
  };

  const Delete = (id) => {
    fetch(`http://localhost:3010/todo?id=${id}`, {
      method: "DELETE",
    })
      .then(() => setTodos((ld) => ld.filter((t) => t._id !== id)))
      .catch((e) => dispatch(SetError(e)));
  };

  const Complete = (id) => {
    fetch(`http://localhost:3010/todo?id=${id}`, {
      method: "PUT",
    })
      .then(() =>
        setTodos((ld) => {
          let i = ld.findIndex((t) => t._id === id);
          ld[i].completed = !ld[i].completed;
          return [...ld];
        })
      )
      .catch((e) => dispatch(SetError(e)));
  };
  let img = useRef(null);

  const Photo = (photo) => {
    let photo64;
    let reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onloadend = () => {
      photo64 = reader.result;
      fetch(`http://localhost:3010/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ photo: photo64 }),
      })
        .then((req) => req.json())
        .then((m) => setMessages([...messages, m]))
        .catch((e) => dispatch(SetError(e)));
    };
  };
  const GetMessage = () => {
    fetch(`http://localhost:3010/message`)
      .then((req) => req.json())
      .then((m) => console.log(m))
      .catch((e) => dispatch(SetError(e)));
  };
  return (
    <div>
      <input ref={ref} />
      <Button onClick={Post}>Post</Button>
      <Button onClick={GetMessage}>Get Message</Button>
      <input type="file" onChange={(e) => Photo(e.target.files)} />
      <div className="todos_group">
        {todos
          .sort((a) => (a.completed ? 1 : -1))
          .map((t) => (
            <div
              style={{
                textDecoration: t.completed ? "line-through" : null,
                width: "200px",
                backgroundColor: t.completed ? "gray" : "#9FE1C2",
                color: "white",
                borderRadius: "5px",
                marginBottom: "10px",
                padding: "5px",
                display: "flex",
                justifyContent: "space-around",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                onClick={() => Complete(t._id)}
                checked={t.completed}
              />
              <div style={{ textAlign: "center" }}>{t.todo}</div>

              <FontAwesomeIcon icon={faTimes} onClick={() => Delete(t._id)} />
            </div>
          ))}
        {messages.map((m) => (
          <img style={{ width: "300px" }} src={m.photo} alt="говно" />
        ))}
      </div>
    </div>
  );
};

export default Test;
