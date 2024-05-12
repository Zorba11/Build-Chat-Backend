import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { parseCommand } from "./ai";

const targetAppPath = "/Users/zorbasworld/Desktop/BulBul/target-app";

require("dotenv").config();

const app = express();
const port = 3010;

app.use(bodyParser.json());

app.post("/process-command", async (req: Request, res: Response) => {
  const { command } = req.body;
  console.log("Received command:", command);

  const parsedOutput = await parseCommand(command);
  console.log("AI parsed output:", parsedOutput?.message.content);

  // Here you will process the command and update the target application
  res.send({ message: "Command received" });
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
