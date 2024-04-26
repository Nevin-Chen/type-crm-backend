import { connectToDatabase } from "./services/mongodbService";
import { app } from "./app";

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  connectToDatabase()
  console.log(`Server started at http://localhost:${port}`);
});
