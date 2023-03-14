const express = require("express");
const db = require("../config/dbConfig");
const TodoController = require("../controller/todo.controller");
const router = express.Router();

// Inserting task here
router.post("/add_task", TodoController.addTask);

// Getting task here
router.get("/get_task", TodoController.getTask);

// Deleting task here
router.delete("/delete_task", TodoController.deleteTask);

module.exports = router;
