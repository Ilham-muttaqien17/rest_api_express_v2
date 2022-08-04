import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_user",
});

db.connect((err) => {
  if (err) throw err;
  console.log(`Database connected..`);
});

export { db };
