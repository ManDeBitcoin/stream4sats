const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'stream4sats.db');
const db = new Database(dbPath);

const createTable = `
  CREATE TABLE IF NOT EXISTS zaps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount INTEGER,
    comment TEXT,
    user TEXT,
    event TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

db.exec(createTable);

module.exports = db;
