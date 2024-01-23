const sqlBase = require('sqlite3').verbose()

const db = new sqlBase.Database(':memory:')


db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        completed BOOLEAN
      )
    `);
  });

module.exports = db;
