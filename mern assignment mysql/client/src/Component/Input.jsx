import React, { useEffect, useState } from "react";
import axios from "axios";
import Notes from "./Notes";

const Input = () => {
  const [error, setError] = useState(false);
  const [allNotes, setAllNotes] = useState([]);
  const [state, setState] = useState({ note: "" });
  const [loading, setLoading] = useState(false);

  // Submitting form here
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (state.note !== "") {
      try {
        setLoading(false);
        await axios.post("http://localhost:8080/api/add_task", {
          task: state.note,
        });
        setState({ note: "" });
      } catch (err) {
        setError(true);
        setLoading(false);
        console.log(err);
      }
    } else {
      alert("Task cannot be empty");
    }
  };

  // Handling input changes here
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  //   Getting task from the DB
  const getTask = async () => {
    setLoading(true);
    try {
      setLoading(false);
      let res = await axios.get("http://localhost:8080/api/get_task");
      setAllNotes(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Deleting task using id from DB
  const handleDelete = async (id) => {
    setLoading(true);
    setError(false);
    try {
      setLoading(false);
      console.log(id);
      let res = await axios.post("http://localhost:8080/api/delete_task", {
        id: Number(id),
      });
      setAllNotes(res.data.result2);
    } catch (err) {
      setError(true);
    }
  };

  // Running useEffect every time when allNotes is getting updated (on submitting or deleting)
  useEffect(() => {
    getTask();
  }, [allNotes]);

  if (error) {
    return <div>Some error occured. Kindly check your DB connection.</div>;
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            onChange={handleChange}
            name="note"
            value={state.note}
            placeholder="Enter task here"
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Notes handleDelete={handleDelete} data={allNotes} />
      )}
    </>
  );
};

export default Input;
