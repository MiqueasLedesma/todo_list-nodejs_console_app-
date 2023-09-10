const { v4: uuidv4 } = require("uuid");

class ToDo {
  constructor(desc) {
    this._id = uuidv4();
    this.desc = desc;
    this.completed_date = null;
  }
}

module.exports = ToDo;
