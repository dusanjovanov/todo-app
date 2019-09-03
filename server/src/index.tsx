import express from "express";
import { body, param, validationResult } from "express-validator";
import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "../../client/src/components/App";
import reducer from "../../client/src/redux/reducer";
import todos from "../todos.json";
import fs from "fs";
import path from "path";
import cheerio from "cheerio";

const PORT = process.env.PORT || 5000;

const db = { todos };
let nextId = 4;

const app = express();

app.use(express.json());

let clientFilesPath: string;

if (process.env.NODE_ENV === "DEVELOPMENT") {
  clientFilesPath = path.resolve(__dirname, "../../dist/client");
} else {
  clientFilesPath = path.resolve(__dirname, "../../build/client");
}

app.use("/static", express.static(clientFilesPath));

app.get("/", (req, res) => {
  const store = createStore(reducer);

  const preloadedState = store.getState();

  const reactHtml = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const templateFile = fs.readFileSync(
    path.resolve(clientFilesPath, "index.html")
  );
  const templateHtml = templateFile.toString();

  const scriptPreloadedState = `<script>
  window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
    /</g,
    "\\u003c"
  )}
  </script>`;

  const $ = cheerio.load(templateHtml);
  $("head").append(scriptPreloadedState);
  $("#root").html(reactHtml);

  res.send($.html());
});

app.get("/api/todos", (req, res) => {
  res.send(db.todos);
});

const sendErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    next();
  }
};

app.post(
  "/api/todos",
  [
    body("text")
      .isString()
      .isLength({ min: 1 }),
    sendErrors
  ],
  (req, res) => {
    const todo = {
      id: nextId++,
      text: req.body.text,
      isDone: false
    };
    db.todos.push(todo);
    res.json(todo);
  }
);

app.patch(
  "/api/todos/:id/toggle",
  [param("id").isNumeric(), sendErrors],
  (req, res) => {
    const id = Number(req.params.id);
    db.todos = db.todos.map(t =>
      t.id === id ? { ...t, isDone: !t.isDone } : t
    );
    res.json(id);
  }
);

app.delete(
  "/api/todos/:id",
  [param("id").isNumeric(), sendErrors],
  (req, res) => {
    const id = Number(req.params.id);
    db.todos = todos.filter(t => t.id !== id);
    res.json(id);
  }
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
