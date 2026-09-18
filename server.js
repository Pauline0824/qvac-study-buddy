import express from "express";
import {
  loadModel,
  LLAMA_3_2_1B_INST_Q4_0,
  completion,
  unloadModel,
} from "@qvac/sdk";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public")); // serves index.html, style.css, app.js

let modelId = null;
let modelReady = false;

// Load the model ONCE when the server starts (not per-request)
async function initModel() {
  console.log("Loading local AI model...");

  modelId = await loadModel({
    modelSrc: LLAMA_3_2_1B_INST_Q4_0,
    onProgress: (p) => {
      console.log(`Downloading: ${p.percentage.toFixed(0)}%`);
    },
  });

  modelReady = true;
  console.log("\nQVAC Study Buddy is ready!\n");
}

// Endpoint the frontend calls when the user submits a question
app.post("/ask", async (req, res) => {
  if (!modelReady) {
    return res.status(503).json({ error: "Model is still loading, please wait..." });
  }

  const { question } = req.body;

  if (!question || !question.trim()) {
    return res.status(400).json({ error: "Question is empty." });
  }

  try {
    const history = [
      {
        role: "user",
        content: question,
      },
    ];

    const result = completion({
      modelId,
      history,
      stream: true,
    });

    let fullAnswer = "";
    for await (const token of result.tokenStream) {
      fullAnswer += token;
    }

    res.json({ answer: fullAnswer });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong generating the answer." });
  }
});

// Graceful shutdown: unload the model
process.on("SIGINT", async () => {
  console.log("\nShutting down...");
  if (modelId) {
    await unloadModel({ modelId });
    console.log("Model unloaded.");
  }
  process.exit(0);
});

app.listen(PORT, async () => {
  console.log(`QVAC Study Buddy running at http://localhost:${PORT}`);
  console.log("Inference is local: the QVAC model runs in this Node process.");
  await initModel();
});