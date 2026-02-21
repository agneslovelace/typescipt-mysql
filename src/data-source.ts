import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Word } from "./entity/Word";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "chrisd",
  password: "hamamushi",
  database: "test_db",
  synchronize: true,
  logging: false,
  entities: [User, Word],
  migrations: [],
  subscribers: [],
});
