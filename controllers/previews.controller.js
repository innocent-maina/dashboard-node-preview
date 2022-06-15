const previewRoutes = (app, fs) => {
  // link to the json database file
  const dataPath = "./data/database.json";

  // helper methods for reading and writing to the json file
  const readFile = (
    callback,
    returnJson = false,
    filePath = dataPath,
    encoding = "utf8"
  ) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        throw err;
      }

      callback(returnJson ? JSON.parse(data) : data);
    });
  };

  const writeFile = (
    fileData,
    callback,
    filePath = dataPath,
    encoding = "utf8"
  ) => {
    fs.writeFile(filePath, fileData, encoding, (err) => {
      if (err) {
        throw err;
      }

      callback();
    });
  };




  const myTimeout = (async) => {
    setTimeout(function(){
      fs.writeFile(dataPath, '{}', function(){console.log('done')})

   }, 86400);//wait 24 hours
  }

  myTimeout()
  // READ
  app.get("/previews", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      res.send(JSON.parse(data));
    });
  });

    // GET PREVIEW BY ID
    app.get("/previews/:id", async(req, res) => {
      readFile((data) => {

        // fetch the preview by id
        const previewId = req.params["id"];
        const newData = data[previewId]
        console.log('below')
        console.log(newData)
          res.status(200).send(data[previewId]);
      }, true);
    });

  // CREATE
  app.post("/previews", async (req, res) => {
     readFile((data) => {
      const newPreviewId = req.body.previewId

      // add the new preview
      data[newPreviewId.toString()] = req.body;

      writeFile(JSON.stringify(data, null, 2), () => {
        setTimeout(function(){
          console.log("Sup!");
       }, 2000);//wait 2 seconds
        res.status(200).send("new preview added");

      });
    }, true);
  });

  // UPDATE
  app.put("/previews/:id", (req, res) => {
    readFile((data) => {
      // add the new preview
      const previewId = req.params["id"];
      data[previewId] = req.body;

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`previews id:${previewId} updated`);
      });
    }, true);
  });

  // DELETE
  app.delete("/previews/:id", (req, res) => {
    readFile((data) => {
      // delete the preview
      const previewId = req.params["id"];
      delete data[previewId];

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`previews id:${previewId} removed`);
      });
    }, true);
  });
};

module.exports = previewRoutes;
