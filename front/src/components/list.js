import React from "react";

const List = ({ handleDelete, persons }) => {
  const handleDel = (ev) => {
    console.log(ev.target.parentNode.id);
    const findit = persons.find((pers) => pers.id == ev.target.parentNode.id);
    console.log(findit);
    if (findit) {
      const result = window.confirm(`Confirm delete ${findit.name}`);
      if (result) handleDelete(ev.target.parentNode.id);
    }
  };

  return (
    <>
      {persons.map((pers) => (
        <li key={pers.id}>
          <p id={pers.id}>
            <span>{pers.name}</span>
            {": "}
            {pers.number}
            {"   "}
            <button onClick={handleDel}>Delete</button>
          </p>
        </li>
      ))}
    </>
  );
};
export default List;
