import { Meteor } from "meteor/meteor";
import mysql from "mysql2/promise";

export const SqlManager = {};

SqlManager["connection"] = undefined;

SqlManager["connect"] = async () => {
  SqlManager.connection = await mysql.createConnection({
    host: Meteor.settings.mysql.host,
    user: Meteor.settings.mysql.username,
    database: Meteor.settings.mysql.database,
    password: Meteor.settings.mysql.password,
    port: Meteor.settings.mysql.port || 3306,
  });

  return SqlManager.connection.connect();
};

SqlManager["disconnect"] = async () => {
  SqlManager.connection.disconnect();
};

SqlManager["query"] = async (querystring) => {
  return SqlManager.connection.query(querystring);
};
