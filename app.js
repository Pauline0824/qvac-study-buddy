
import {
  loadModel,
  LLAMA_3_2_1B_INST_Q4_0,
  completion,
  unloadModel,
} from "@qvac/sdk";

async function main() {
  let modelId;

  try {
    console.log("Loading local AI model...");

    modelId = await loadModel({
      modelSrc: LLAMA_3_2_1B_INST_Q4_0,
      onProgress: (p) => {
        console.log(
          `Downloading: ${p.percentage.toFixed(0)}%`
        );
      },
    });

    console.log("\nQVAC Study Buddy is ready!\n");

    const history = [
      {
        role: "user",
        content:
          "Explain abstraction in programming " +
          "in simple words for a college student. " +
          "Give a short example.",
      },
    ];

    const result = completion({
      modelId,
      history,
      stream: true,
    });

    console.log("AI RESPONSE:\n");

    for await (const token of result.tokenStream) {
      process.stdout.write(token);
    }

    console.log("\n");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    if (modelId) {
      await unloadModel({ modelId });
      console.log("Model unloaded.");
    }
  }
}

main();