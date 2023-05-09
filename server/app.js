// In package.json, the "type" is "module". This means I have to import using the word "import" as oposed to "require";
import express from "express";
import { spawn } from "child_process";

const app = express();

app.get('/run', (req, res) => {
        const pythonProcess = spawn('python', ['../machine_learning/setup.py']);

        let generatedText = '';
        let errorMessage = '';

        pythonProcess.stdout.on('data', (data) => {
            generatedText += data.toString();
        });
      
        pythonProcess.stderr.on('data', (data) => {
            errorMessage += data.toString();
        });
      
        pythonProcess.on('close', (code) => {
          if (code === 0) {
            // Send the generated text as the response
            res.send(generatedText);
          } else {
            // Send the error message as the response
            res.status(500).send(errorMessage);
          }
        });
})

// Using the port from the environmental variables OR port 8080.
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})