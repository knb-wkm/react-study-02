import React, { Component } from "react";
import { connect } from "react-redux";
import Todo from "./Todo";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {id: 1, name: "react勉強する", done: true},
        {id: 2, name: "更にreactを勉強する", done: false}
      ],
      hideDone: false
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

    const hideDone = () => {
      this.setState({ hideDone: !this.state.hideDone });
    };

    const todos = this.state.hideDone
          ? this.state.todos.filter(todo => todo.done === false)
          : this.state.todos;

    return (
      <div>
        <h2>{title}</h2>

        <input
          type="text"
          ref="todoText"
          onKeyPress={(e) => addTodo(e)} />

          <button onClick={hideDone}>hide done</button>

          {this.props.todos.map(todo => 
          <Todo todo={todo} toggleTodo={toggleTodo} />)}
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    todos: state
  };
};

App = connect(mapStateToProps)(App);

export default App;
