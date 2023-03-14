const db = require("../config/dbConfig");

class TodoController {
  static addTask = async (req, res) => {
    const { task } = req.body;
    console.log(task);
    const sql = "INSERT INTO tasks (task) VALUES (?)";
    const query = db.query(sql, [task], (error, result) => {
      if (error) throw error;
      console.log(result);
      res.send("Task Posted Successfully");
    });
  };

  static getTask = async (req, res) => {
    db.query("SELECT * FROM tasks", (error, result) => {
      if (error) {
        throw error;
      }
      if (result) {
        res.send(result);
      }
    });
  };

  static deleteTask = async (req, res) => {
    const { id } = req.body;
    const sql = "DELETE FROM tasks WHERE id=?";
    const query = db.query(sql, [id], (error, result) => {
      if (error) throw error;
      if (result) {
        res.send("Task Deleted Successfully");
      }
    });
  };
}

module.exports = TodoController;
