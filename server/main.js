import { Meteor } from "meteor/meteor";
import { LinksCollection } from "/imports/api/links";
import { SqlManager } from "../imports/lib/mysql";
import "../imports/api/rest";

async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

Meteor.startup(async () => {
  await SqlManager.connect();

  try {
    await SqlManager.query(
      "CREATE TABLE Links (title varchar(255), url varchar(255)) "
    );
  } catch (e) {
    console.log(e.message);
  }

  const [rows, fields] = await SqlManager.query("SELECT * FROM Links;");

  if (rows.length === 0) {
    await SqlManager.query(
      'INSERT INTO Links VALUES("Do the Tutorial","https://www.meteor.com/tutorials/react/creating-an-app")'
    );
    await SqlManager.query(
      'INSERT INTO Links VALUES("Follow the Guide","https://guide.meteor.com")'
    );
    await SqlManager.query(
      'INSERT INTO Links VALUES("Read the Docs","https://docs.meteor.com")'
    );
    await SqlManager.query(
      'INSERT INTO Links VALUES("Discussions","https://forums.meteor.com")'
    );
  } else {
    console.log('\nEinträge in der Test-Tabelle "Links"');
    console.log("====================================\n");
    rows.forEach((row, index) => {
      console.log("Eintrag " + (index + 1) + ": ");
      console.log("Title: " + row.title);
      console.log("Link: " + row.url + "\n");
    });
  }

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
