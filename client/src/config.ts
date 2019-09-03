export const API_ENDPOINT =
  process.env.NODE_ENV === "DEVELOPMENT"
    ? "http://localhost:5000/api"
    : " https://todo-jodu.herokuapp.com/api";
