import React, { useState } from "react";
import { refinePrompt } from "../utils/gemini";

export default function PromptForm() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [tone, setTone] = useState("creative");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await refinePrompt(input, tone);
    setOutput(result);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>Enter your rough prompt:</label>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        placeholder="Type your prompt here..."
      />

      <label>Select tone:</label>
      <select value={tone} onChange={(e) => setTone(e.target.value)}>
        <option value="creative">Creative</option>
        <option value="technical">Technical</option>
        <option value="research">Research</option>
        <option value="concise">Concise</option>
      </select>

      <button type="submit" disabled={loading}>
        {loading ? "Refining..." : "Polish Prompt"}
      </button>

      {output && (
        <div className="output">
          <h3>Refined Prompt:</h3>
          <pre>{output}</pre>
        </div>
      )}
    </form>
  );
}
