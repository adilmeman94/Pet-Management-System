const app = require("./config/express");
const mongoose = require("mongoose");
const requestLogger = require("./middleware/logger.middleware");

require("dotenv").config();

app.use(requestLogger);

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/pets", require("./routes/pet.routes"));
app.use("/api/adoptions", require("./routes/adoption.routes"));

mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the process with an error code
    });

app.listen(process.env.PORT || 5000, () => console.log("Server running on port 5000"));

