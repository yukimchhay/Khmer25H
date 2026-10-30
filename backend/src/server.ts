import express, { type Request, type Response } from "express";
const app = express();
const PORT = process.env.PORT || 5000;
app.get("/", (req :Request, res : Response) => {
  res.send("this is the express is running normally and very smothly ");
});
app.listen(PORT, () => [console.log("the server is running on the port 5000")]);
