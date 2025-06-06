import exp from 'constants';
import { DatabaseSync} from 'node:sqlite'
const db = new DatabaseSync(':memory:');



// Execute SQL statements from strings
db.exec(`
    CREATE TABLE articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        publishTime TEXT NOT NULL,
        author TEXT,
        content TEXT NOT NULL
        )
    `)

export default db;