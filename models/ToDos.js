const ToDo = require("./ToDo");

class ToDos {
  constructor() {
    this._list = {};
  }

  createToDo(desc = "") {
    const todo = new ToDo(desc);
    this._list[todo._id] = todo;
  }

  deleteTodo(id = "") {
    if (this._list[id]) delete this._list[id];
    console.log("Tarea eliminada!".yellow);
  }

  loadToDosFromArray(todos = []) {
    todos.forEach((todo) => (this._list[todo._id] = todo));
  }

  get listArr() {
    const list = [];
    Object.keys(this._list).forEach((key) => list.push(this._list[key]));
    return list;
  }

  get pendingArr() {
    const list = [];
    Object.keys(this._list).forEach((key) => {
      const finishToDo = this._list[key];
      if (!finishToDo.completed_date) list.push(finishToDo);
    });
    return list;
  }

  get completedArr() {
    const list = [];
    Object.keys(this._list).forEach((key) => {
      const finishToDo = this._list[key];
      if (finishToDo.completed_date) list.push(finishToDo);
    });
    return list;
  }

  listAll({ pending, completed }) {
    let arrMap = [];

    if (!pending && !completed) arrMap = this.listArr;
    if (pending) arrMap = this.pendingArr;
    if (completed) arrMap = this.completedArr;

    console.log(`Listar tareas`.yellow);
    arrMap.forEach((todo, index) =>
      console.log(
        `${index + 1}.`.green,
        `${todo.desc} :: ${
          todo.completed_date ? "Completada".green : "Pendiente".red
        }`,
        completed ? `${todo.completed_date}`.green : ""
      )
    );
  }

  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const todo = this._list[id];
      if (!todo.completed_date) {
        todo.completed_date = new Date().toISOString();
      }
    });
  
    this.listArr.forEach((todo) => {
      if (!ids.includes(todo._id)) {
        this._list[todo._id].completed_date = null;
      }
    });
  
    console.log("Tareas actualizadas!".yellow);
  }
  
}

module.exports = ToDos;
