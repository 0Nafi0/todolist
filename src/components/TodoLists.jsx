import { useState } from "react";

function TodoLists({ lists, onCheck, onDelete, onEdit }) {
  return (
    <ul>
      {lists.map((todo) => (
        <ListItem
          item={todo}
          key={todo.id}
          onCheck={onCheck}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

function ListItem({ item, onCheck, onDelete, onEdit }) {
  const [currentEditedValue, setCurrentValue] = useState(item.todo);
  const [isEditing, setIsEditing] = useState(false);

  function handleSaveButton() {
    setIsEditing(false);
    onEdit(item, currentEditedValue);
  }

  function handleDeleteButton(e) {
    e.preventDefault();
    onDelete(item);
  }

  function handleEditInput(e) {
    if (e.key === "Enter") {
      handleSaveButton();
    } else {
      setCurrentValue(e.target.value);
    }
  }

  function handleCheck() {
    onCheck(item);
  }
  return (
    <li className={`todo-item ${item.state ? "completed" : undefined}`}>
      <div className="contents">
        <input type="checkbox" value={item.state} onChange={handleCheck} />
        {!isEditing && (
          <label
            style={{ textDecoration: item.state ? "line-through" : undefined }}
          >
            {item.todo}
          </label>
        )}
        {isEditing && (
          <input
            type="text"
            className="todo-item-input"
            value={currentEditedValue}
            onChange={(e) => handleEditInput(e)}
            onKeyDown={(e) => handleEditInput(e)}
          />
        )}
      </div>
      <div className="buttons">
        {isEditing && (
          <button className="save-button" onClick={handleSaveButton}>
            Save
          </button>
        )}
        {!isEditing && (
          <button
            className="edit-button"
            onClick={() => setIsEditing((isEditing) => !isEditing)}
          >
            Edit
          </button>
        )}
        <button className="delete-button" onClick={handleDeleteButton}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoLists;
