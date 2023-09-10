require("colors");
const inquirer = require("inquirer");

const menuOpts = [
  {
    type: "list",
    name: "item",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: 1,
        name: `${"1.".yellow} Crear tarea`,
      },
      {
        value: 2,
        name: `${"2.".yellow} Listar tareas`,
      },
      {
        value: 3,
        name: `${"3.".yellow} Listar tareas completadas`,
      },
      {
        value: 4,
        name: `${"4.".yellow} Listar tareas pendientes`,
      },
      {
        value: 5,
        name: `${"5.".yellow} Completar tarea(s)`,
      },
      {
        value: 6,
        name: `${"6.".yellow} Borrar tarea`,
      },
      {
        value: 0,
        name: `${"0.".yellow} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.log("=======================================");
  console.log("         Seleccione una opción".green);
  console.log("=======================================\n");

  const { item } = await inquirer.prompt(menuOpts);

  console.clear();

  return item;
};

const inquirerPause = async () => {
  const question = [
    {
      type: "input",
      name: "item",
      message: `Presione ${"Enter".green} para continuar`,
    },
  ];

  const { item } = await inquirer.prompt(question);

  console.clear();
  return item;
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      validate(value) {
        if (value.length === 0) {
          return "Ingrese un valor";
        }
        return true;
      },
      message,
    },
  ];

  const { desc } = await inquirer.prompt(question);

  return desc;
};

const listToDosDelete = async (todos = []) => {
  const choices = todos.map((todo, index) => ({
    value: todo._id,
    name: `${index + 1}.`.green + ` ${todo.desc}`,
  }));

  choices.unshift({ value: 0, name: "0.".green + " Cancelar" });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(questions);
  return id;
};

const confrimation = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);

  return ok;
};

const listToDosForComplete = async (todos = []) => {
  const choices = todos.map((todo, index) => ({
    value: todo._id,
    name: `${index + 1}.`.green + ` ${todo.desc}`,
    checked: todo.completed_date ? true : false,
  }));

  const questions = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(questions);
  return ids;
};


module.exports = {
  listToDosForComplete,
  listToDosDelete,
  inquirerMenu,
  inquirerPause,
  confrimation,
  readInput,
};
