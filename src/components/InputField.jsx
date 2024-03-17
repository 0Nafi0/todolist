import { useState } from "react";

export default function InputField({ onSelect }) {
  const [currentState, setCurrentState] = useState("");

  function handleSubmit(event, value) {
    event.preventDefault();
    if (!currentState) return;
    onSelect(value);
    setCurrentState("");
  }
  return (
    <form onSubmit={(e) => handleSubmit(e, currentState)}>
      <input
        className="add-task-input"
        type="text"
        value={currentState}
        onChange={(e) => setCurrentState(e.target.value)}
      />
      <button className="add-button">Add</button>
    </form>
  );
}
