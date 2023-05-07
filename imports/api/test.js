import { SqlManager } from "../lib/mysql";

export const TestTabelle = {};

TestTabelle["create"] = async () => {
  const result = await SqlManager.query(
    "CREATE TABLE Persons (PersonID int, LastName varchar(255), FirstName varchar(255), Address varchar(255), City varchar(255));"
  );
  return result;
};