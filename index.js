const express = require("express");
const fileUpload = require("express-fileupload");
const { initConnection } = require("./lib/database/initConnection");

const app = express();
const port = 3000;

// Require routes
const { authApi } = require("./routes/auth");

// Body parser
app.use(express.json());

//To upload files
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Adding routes
authApi(app);

app.listen(port, async () => {
  await initConnection();
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
