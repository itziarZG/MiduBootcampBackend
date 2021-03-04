const express = require("express");

//Create server
const server = express();
// server.use(cors());
server.use(express.json());

//init express app

const serverPort = 3001;
server.listen(serverPort, () => {
  console.log(`listening at localhost:${serverPort}`);
});

// //static SERVER
// const staticServerPath = './public' //ruta relativa del proyecto
// server.use(express.static(staticServerPath));

//API](//api) listen fetch request

//API](//api) request GET
let people = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];
//ENDPOINTS
//listado ALL personas GET
server.get("/api/persons", (req, res) => {
  const response = people;
  res.json(response);
});

// POST add Persons
server.post("/api/persons", (req, res) => {
  let pers = req.body;
  console.log(pers);
  if (!pers) {
    return res.status(400).json({
      error: "content missing",
    });
  } else {
    const id = parseInt(Math.random() * 50);
    pers = { ...pers, id: id };
    people = [...people, { pers }];
    res.status(201).end();
  }
});

//Info 1 persona
server.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const findit = people.find((pers) => parseInt(pers.id) === parseInt(id));
  if (findit) res.send(`<p>${findit.name}: ${findit.number}</p>`);
  else res.status(404).end();
});

//Delete person
server.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const findit = people.find((pers) => parseInt(pers.id) === parseInt(id));
  if (findit) {
    people = people.filter((pers) => pers.id !== id);
    res.status(204).end();
  } else res.status(404).end();
});

//info
server.get("/info", (req, res) => {
  const message = `<p>Phonebook has info for ${people.length} people</p>`;
  const date = new Date();
  const response = message + `<p>${date}</p>`;
  res.send(response);
});
//API](//api) resquest POST

server.post("./new-user", (req, res) => {
  const response = { resp: "respuesta que queramos" };

  res.json(response);
});
