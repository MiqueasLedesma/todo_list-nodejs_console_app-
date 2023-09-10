const fs = require("fs");
const dbPath = "./db/data.json";

const saveDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data));
};

const readDB = () => {
  if (!fs.existsSync(dbPath)) {
    return;
  }

  const info = fs.readFileSync(dbPath, { encoding: "utf-8" });

  return JSON.parse(info);

};

module.exports = { saveDB, readDB };
