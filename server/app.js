// In package.json, the "type" is "module". This means I have to import using the word "import" as oposed to "require";
import express from "express";

const app = express();

// Using the port from the environmental variables OR port 8080.
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})