import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {id: 1, name: "react勉強する", done: true},
        {id: 2, name: "更にreactを勉強する", done: false}
      ]
    };
  }

  render() {
    const title = "todo app";

    const renderTodo = (todo) => {
      const style = {
        textDecoration: todo.done ? "line-through" : "none"
      };
      
      return (
        <ul style={style}>
          <li>{todo.id}: {todo.name}</li>
          <button onClick={() => toggleTodo(todo.id)}>
            toggle todo
          </button>
        </ul>
      );
    };

    const toggleTodo = (todo_id) => {
      this.setState({
        todos: this.state.todos.map(
          todo => todo.id === todo_id ?
            {...todo, done: !todo.done} : todo
        )
      });
    };

    return (
      <div>
        <h2>{title}</h2>
        {this.state.todos.map(todo => renderTodo(todo))}
      </div>
    );
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

registerServiceWorker();
