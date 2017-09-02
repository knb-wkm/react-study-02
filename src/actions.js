const addTodo = (name) => {
  return {
    type: "ADD_TODO",
    name: name
  };
};

const toggleTodo = (todo_id) => {
  return {
    type: "TOGGLE_TODO",
    todo_id: todo_id
  };
};

export { addTodo, toggleTodo };
