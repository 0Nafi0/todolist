import { useState, useEffect } from "react";
import InputField from "./components/InputField";
import TodoLists from "./components/TodoLists";

function getTodoLists() {
  const lists = localStorage.getItem("todo-lists");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
}

function App() {
  const [currentLists, setCurrentLists] = useState(getTodoLists());

  useEffect(() => {
    const storedLists = localStorage.getItem("todo-lists");
    if (storedLists) {
      setCurrentLists(JSON.parse(storedLists));
    }
  }, []);

  function handleDelete(todo) {
    setCurrentLists((prevLists) =>
      prevLists.filter((item) => item.id !== todo.id)
    );
  }

  function handleEdit(item, editedValue) {
    if (!editedValue) return;
    setCurrentLists((prevLists) =>
      prevLists.map((listItem) =>
        item.id === listItem.id ? { ...listItem, todo: editedValue } : listItem
      )
    );
  }

  function handleCheck(todo) {
    setCurrentLists((prevLists) =>
      prevLists.map((item) =>
        item.id === todo.id ? { ...item, state: !item.state } : item
      )
    );
  }

  function handleAddToDoList(todo) {
    const id = crypto.randomUUID();
    const newList = {
      id,
      todo,
      state: false,
    };
    setCurrentLists((prevToDoLists) => [...prevToDoLists, newList]);
  }

  useEffect(() => {
    localStorage.setItem("todo-lists", JSON.stringify(currentLists));
  }, [currentLists]);

  return (
    <>
      <h1>ToDoIST</h1>
      <div className="todo-list">
        <InputField onSelect={handleAddToDoList} />
        <TodoLists
          lists={currentLists}
          onCheck={handleCheck}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </>
  );
}

export default App;
