require("colors");

const {
  inquirerMenu,
  inquirerPause,
  readInput,
  listToDosDelete,
  confrimation,
  listToDosForComplete,
} = require("./helpers/inquirer");
const { saveDB, readDB } = require("./helpers/db_actions");

const ToDos = require("./models/ToDos");

const main = async () => {
  let opt = "";
  const todos = new ToDos();

  const db = readDB();

  if (db) {
    todos.loadToDosFromArray(db);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1: // Crear tarea
        const desc = await readInput("Descripción:".yellow.bold);
        todos.createToDo(desc);
        console.log(desc);
        break;
      case 2: // Lstar todas las tareas
        todos.listAll({});
        break;
      case 3: // Listar completadas
        todos.listAll({ completed: true });
        break;
      case 4: // Listar pendientes
        todos.listAll({ pending: true });
        break;
      case 5: // Completar tareas
        const ids = await listToDosForComplete(todos.listArr);
        todos.toggleCompleted(ids);
        break;
      case 6: // Eliminar tareas
        const id = await listToDosDelete(todos.listArr);
        if (id !== 0) {
          const ok = await confrimation("¿Estas seguro?");
          if (ok) todos.deleteTodo(id);
        }
        break;
      default:
        console.log("Hasta la proxima!");
        break;
    }

    saveDB(todos.listArr);

    await inquirerPause();
  } while (opt !== 0);
};

main();
