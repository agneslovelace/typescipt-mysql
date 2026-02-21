import "reflect-metadata"
import mysql, { ConnectionOptions } from 'mysql2';

const access: ConnectionOptions = {
  user: 'chrisd',
  database: 'test_db',
  password: 'hamamushi'
};

const conn = mysql.createConnection(access);

conn.query('SELECT * from `users`;', (_err, rows) => {
  console.log(rows)
});