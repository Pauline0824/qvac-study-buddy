const askBtn = document.getElementById("askBtn");
const questionInput = document.getElementById("question");
const statusEl = document.getElementById("status");
const answerBox = document.getElementById("answerBox");
const answerText = document.getElementById("answerText");

askBtn.addEventListener("click", async () => {
  const question = questionInput.value.trim();

  if (!question) {
    statusEl.textContent = "Please type a question first.";
    return;
  }

  askBtn.disabled = true;
  statusEl.textContent = "Thinking... (running locally, may take a moment)";
  answerBox.classList.add("hidden");

  try {
    const res = await fetch("/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();

    if (!res.ok) {
      statusEl.textContent = data.error || "Something went wrong.";
      return;
    }

    statusEl.textContent = "";
    answerText.textContent = data.answer;
    answerBox.classList.remove("hidden");
  } catch (err) {
    statusEl.textContent = "Could not reach the server.";
    console.error(err);
  } finally {
    askBtn.disabled = false;
  }
});