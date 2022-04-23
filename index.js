/* -------------------------------------------------------------------------- */
/*            Express Refresher - https://expressjs.com/en/api.html           */
/* -------------------------------------------------------------------------- */

// import express to the express value

const express = require("express");

// instaniate application

const app = express();

/* -------------------------------- PUG SETUP ------------------------------- */

const path = require("path");
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

/* ----------------------------- JSON Middleware ---------------------------- */
// for posts with Content-Type: application/json
app.use(express.json());

/* -------------------------------- Using Pug ------------------------------- */

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Danny",
    getName: () => "Super Danny",
    colorArray: ["Red", "Yellow", "Blue"],
  });
});

app.get("/layout", (req, res) => {
  res.render("main");
});

// express.urlencoded() for application/x-www-form-urlencoded

// listen for GET requests on / path
// query paramters from user - ?name=Danny
// multiple queries ?name=Danny&age=39
// http://localhost:3000/?name=danny&age=39

// send closes the connection - stops that open loop thing in browser
// res.end()
// res.sendStatus(404) or res.status(404).send('Not found') or res.status(404).end

// Express Methods for HTTP verbs get() - post() - put() - delete() - patch()
// All methods receive a callback function - pass the method an arrow function (req,res) => res.send("Hey") - request - response
// request object - headers - body etc...in API reference

app.get("/", (req, res) => {
  console.log(req.query);
  // query is an object - for in loop
  for (const key in req.query) {
    console.log(key, req.query[key]);
  }

  // send the query back
  res.send(req.query);

  // single properties
  // req.query.name // danny

  // send JSON back - takes object or array - converts to JSON
  // res.json({danny: 'that's you})
});

app.get("/danny", (req, res) => {
  res.send("Hello Danny!");
});

app.get("/cookie", (req, res) => {
  res.cookie("username", "Danny", { domain: ".dannyallday.com" });
  res.send("Got a cookie");
});

/* ------------------------------ HTTP Headers ------------------------------ */

app.get("/headers", (req, res) => {
  console.log(req.headers);
  // res.send(`Your browser is ${req.headers["user-agent"]}`);
  // or
  res.send(req.header("User-Agent"));

  /* ------------------------- Change HTTP Header Vaue ------------------------ */
  // res.set('Content-Type','text/html')
  // res.type('json')
});

/* -------------------------------- Redirects ------------------------------- */

app.get("/redirect", (req, res) => {
  res.redirect("/danny"); // 302 redirect // temporary
  // res.redirect(301,'/danny') 301 redirect // permanent
  // res.redirect('back') .. go back
});

app.post("/form", (req, res) => {
  const name = req.body.name;
  console.log(name);
});

/* ----------------------------------- PUG ---------------------------------- */

// Listen on PORT
app.listen(3000);
