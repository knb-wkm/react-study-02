import React, { Component } from 'react';
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

class Todo extends Component {
  render() {
    const { todo, toggleTodo } = this.props;

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
  }
}

Todo.propTypes = {
  todo: PropTypes.number.isRequired,
  toggleTodo: PropTypes.func.isRequired
};

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

    const toggleTodo = (todo_id) => {
      this.setState({
        todos: this.state.todos.map(
          todo => todo.id === todo_id ?
            {...todo, done: !todo.done} : todo
        )
      });
    };

    const addTodo = (e) => {
      if (e.key !== "Enter") return;

      const next_id = this.state.todos.slice()
            .sort( (a, b) => b.id - a.id )[0].id + 1;

      const newTodo = {
        id: next_id,
        name: this.refs.todoText.value,
        done: false
      };

      this.setState({ todos: [...this.state.todos, newTodo] });

      this.refs.todoText.value = "";
    };

    return (
      <div>
        <h2>{title}</h2>

        <input
          type="text"
          ref="todoText"
          onKeyPress={(e) => addTodo(e)} />

          {this.state.todos.map(todo => <Todo todo={todo} toggleTodo={toggleTodo} />)}
      </div>
    );
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

registerServiceWorker();
