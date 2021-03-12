import React, { useState } from "react";

const Form = (props) => {
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handleNameChange = (ev) => {
    setNewName(ev.target.value);
  };
  const handlePhoneChange = (ev) => {
    setNewPhone(ev.target.value);
  };
  const handleClick = (ev) => {
    ev.preventDefault();
    props.handleClick({ name: newName, number: newPhone });
    setNewName("");
    setNewPhone("");
  };
  return (
    <form onSubmit={handleClick}>
      <div>
        name:{" "}
        <input
          onChange={handleNameChange}
          type="text"
          name="name"
          value={newName}
        />
      </div>
      <div>
        number:{" "}
        <input
          onChange={handlePhoneChange}
          type="number"
          name="phone"
          value={newPhone}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default Form;
