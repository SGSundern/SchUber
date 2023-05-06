import { Meteor } from "meteor/meteor";
import { LinksCollection } from "/imports/api/links";
import mysql from "mysql2";

async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

const initMySql = () => {
  var con = mysql.createConnection({
    host: Meteor.settings.mysql.host,
    user: Meteor.settings.mysql.username,
    password: Meteor.settings.mysql.password,
    port: Meteor.settings.mysql.port || 3306,
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
};

Meteor.startup(async () => {
  initMySql();

  // If the Links collection is empty, add some data.
  if ((await LinksCollection.find().countAsync()) === 0) {
    await insertLink({
      title: "Do the Tutorial",
      url: "https://www.meteor.com/tutorials/react/creating-an-app",
    });

    await insertLink({
      title: "Follow the Guide",
      url: "https://guide.meteor.com",
    });

    await insertLink({
      title: "Read the Docs",
      url: "https://docs.meteor.com",
    });

    await insertLink({
      title: "Discussions",
      url: "https://forums.meteor.com",
    });
  }

  // We publish the entire Links collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish("links", function () {
    return LinksCollection.find();
  });
});
