const express = require("express");
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors());

let customers = [
  {
    id: 0,
    name: "Jon Smith"
  },
  {
    id: 1,
    name: "Fatima Hussain"
  },
  {
    id: 2,
    name: "Carlos Santana"
  }
]
let nextIndex = 100;

app.get("/", function(request, response) {
  response.send("Welcome to CYF customers server");
});
app.get("/customers", function(request, response) {
  response.send(customers);
});
app.get("/customers/:id", function(request, response) {
  const id = request.params.id;
  const recipe = customers.find(r => id == r.id);
  if (recipe) {
    response.json(recipe);
  } else {
    response.sendStatus(404);
  }
});

app.post("/customers", function(request, response) {
  const recipe = request.body;
  customers.push(recipe);
  response.status(201).json(recipe);
});

app.put("/customers/:id", function(request, response) {
  const id = request.params.id;
  
  let recipeSubmitted = request.body;
  let existingRecipe = customers.find(r => id == r.id);
  if (existingRecipe) {
    existingRecipe.name = recipeSubmitted.name;
    response.json(existingRecipe);
  } else {
    response.sendStatus(404);
  }
});

app.delete("/customers/:id", function(request, response) {
  const id = request.params.id // no typed id
  const indexToDelete = customers.findIndex(item => id == item.id );
  if (indexToDelete >= 0) {
    customers.splice(indexToDelete, 1);
    response.sendStatus(204);
  }
});

app.listen(process.env.PORT);
