import React from "react";
import { AiFillDelete } from "react-icons/ai";
const Notes = ({ handleDelete, data }) => {
  console.log(data);

  const style = {
    display: "flex",
    padding: "6px",
    borderRadius: "16px",
    margin: "4px",
    border: "0.5px solid grey",
    justifyContent: "space-evenly",
    alignItems: "center",
  };

  return (
    <>
      <div style={{ width: "70%", margin: "auto" }}>
        {data?.map((el, i) => {
          return (
            <div style={style} key={el.id}>
              <h3>{el.task}</h3>
              <p>{el.time}</p>
              <AiFillDelete
                style={{ cursor: "pointer" }}
                onClick={() => handleDelete(el.id)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
