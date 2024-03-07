import loadFiles from "../../Functions/fileLoader.js";
import "colors";

async function loadEvents(client) {
  const files = await loadFiles("src/Events");
  //Promising all the files and looping through them and executing them.
  await Promise.all(
    files.map(async (file) => {
      const event = await import(`file://${file}`);
      try {
        //Loading the events
        const eventName = event.default.name;
        const execute = (...args) => event.default.execute(...args, client);
        //Rest if set
        if (event.default.rest) {
          if (event.default.once) client.rest.once(eventName, execute);
          else client.rest.on(eventName, execute);
        } else {
          //Execute once if set
          if (event.default.once) client.once(eventName, execute);
          else client.on(eventName, execute);
        }
      } catch (err) {
        console.log(err);
      }
    })
  );
}

export default loadEvents;
