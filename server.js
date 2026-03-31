const express = require("express");

const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors({ origin: "*" }));
app.use(express.json());

let greetings = "hello";
app.get("/", (req, res) => {
  res.send(`${greetings}`);
  if (greetings == "hello") {
    greetings = "bye";
  } else if (greetings == "bye") {
    greetings = "hello";
  }
});

let num = 0;
app.get("/count", (req, res) => {
  num++;
  res.send(num);
});

const todos = ["eat food", "walk dog"];
const time = [10, 15];
// const tasks = [];

app.get("/list", (req, res) => {
  res.send({ todos, time });
});
// get the list of todos - done
// create a todo - Done
// delete a todo

app.post("/add", (req, res) => {
  todos.push(req.body.task);
  time.push(req.body.time);

  res.send("Post Successfully sent");
});

app.get("/delete", (req, res) => {
  const index = req.query.index;
  todos.splice(index, 1);
  time.splice(index, 1);

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
