import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

const App = () => {
  const title = "todo app";
  const todos = [
    {id: 1, name: "react勉強する", done: true},
    {id: 2, name: "更にreactを勉強する", done: false}
  ];

  const renderTodo = (todo) => {
    const style = {
      textDecoration: todo.done ? "line-through" : "none"
    };
    
    return (
      <ul style={style}>
        <li>{todo.id}: {todo.name}</li>
      </ul>
    );
  };

  return (
    <div>
      <h2>{title}</h2>
      {todos.map(todo => renderTodo(todo))}
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

registerServiceWorker();
