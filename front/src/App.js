import React, { useState, useEffect } from "react";
import Filter from "./components/filter";
import Form from "./components/form";
import List from "./components/list";
import axiosServ from "./services/axios";

import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredList, setFilterList] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [updateData, setUpdateData] = useState(false);
  //Initial Data
  // useEffect(() => {
  //   //fetch to localhost:3001
  //   axiosServ.getPhones().then((response) => {
  //     console.log("here", response);
  //     setPersons(response);
  //   });
  // }, []);

  //update
  useEffect(() => {
    //fetch to localhost:3001
    axiosServ.getPhones().then((response) => {
      setPersons(response);
    });
  }, [updateData]);

  const handleClick = (newPerson) => {
    let findit = persons.find(
      (pers) => pers.name.toLowerCase() === newPerson.name.toLowerCase()
    );
    if (findit) {
      findit = { ...findit, number: newPerson.number };
      axiosServ
        .updateData(findit)
        .then((resp) => {
          if (resp.status === 200) {
            setErrorMessage({
              mess: `User ${findit.name} updated`,
              color: "green",
            });
            setUpdateData((prev) => !prev);
            setTimeout(() => {
              setErrorMessage(null);
            }, 2000);
          } else {
            console.log(resp);
            setErrorMessage({
              mess: resp,
              color: "red",
            });
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage({
            mess: err.errorMessage,
            color: "red",
          });
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        });
    } else {
      axiosServ
        .addItem(newPerson)
        .then((response) => {
          setUpdateData((prev) => !prev);
          setErrorMessage({
            mess: `${newPerson.name} has already added to server`,
            color: "green",
          });
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })
        .catch((err) => {
          setErrorMessage({
            mess: err.errorMessage,
            color: "red",
          });
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        });
    }
  };

  const handleSearch = (word) => {
    console.log(word);
    axiosServ.find(word).then((resp) => {
      setFilterList(resp);
    });
  };

  const handleDelete = (id) => {
    axiosServ.deleteItem(id).then((resp) => {
      if (resp.status === 204) {
        setErrorMessage({
          mess: `Phone was already removed from server`,
          color: "red",
        });
        setUpdateData((prev) => !prev);
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      } else {
        const mess = resp.response.statusText;
        console.log(mess);
        setErrorMessage({
          mess: resp.response.statusText,
          color: "red",
        });
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    });
  };

  return (
    <div className="home">
      <h1>Phonebook</h1>
      {errorMessage != null ? (
        <div className={`error error_${errorMessage.color}`}>
          {errorMessage.mess}
        </div>
      ) : (
        <></>
      )}
      <Filter handleSearch={handleSearch} />
      <h2>Add new One</h2>
      <Form handleClick={handleClick} />
      <h2>Numbers</h2>
      <ul>
        <List handleDelete={handleDelete} persons={filteredList || persons} />
      </ul>
    </div>
  );
};

export default App;
