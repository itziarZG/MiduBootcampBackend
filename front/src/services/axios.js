import axios from "axios";
// const baseUrl = "http://localhost:3001/api/persons";
const baseUrl = "https://fierce-dawn-31208.herokuapp.com/api/persons";

const getPhones = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
const addItem = (pers) => {
  const request = axios.post(baseUrl, pers);
  return request.then((resp) => resp.data);
};
const find = (word) => {
  const req = axios.get(baseUrl + "/" + word);
  return req.then((resp) => resp.data);
};
const deleteItem = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((resp) => resp).catch((err) => err);
};
const updateData = (pers) => {
  const request = axios.put(`${baseUrl}/${pers.id}`, pers);
  return request.then((resp) => resp);
};

export default { getPhones, deleteItem, addItem, find, updateData };
