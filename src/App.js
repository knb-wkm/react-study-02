import React, { Component } from "react";
import Todo from "./Todo";

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

export default App;
