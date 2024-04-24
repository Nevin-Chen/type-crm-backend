import { connectToDatabase } from "./services/mongodbService";
import { app } from "./app";

const port = process.env.PORT || 3000;

connectToDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
