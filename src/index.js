const createServer = require("./util/server");
require("dotenv").config();
const connect = require("./util/db")

const PORT = process.env.PORT;

const app = createServer();

const server = app.listen(PORT, async () => {
  console.log(`server started on Port ${PORT}`);
  await connect();
});
