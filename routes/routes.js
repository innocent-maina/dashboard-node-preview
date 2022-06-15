// import other routes
const previewRoutes = require("../controllers/previews.controller");

const appRouter = (app, fs) => {
  // default route
  app.get("/", (req, res) => {
    res.send("Server is running");
  });

  // // other routes
  previewRoutes(app, fs);
};

module.exports = appRouter;
