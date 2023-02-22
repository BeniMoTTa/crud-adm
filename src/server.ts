import app from "./app";
import { startDataBase } from "./database";

app.listen(3000, async () => {
  await startDataBase();
  console.log("Server is running!");
});
