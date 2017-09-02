import React, { Component } from "react";
import { connect } from "react-redux";
import Todo from "./Todo";
import { addTodo } from "./actions";

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

    const addTodo = (e) => {
      if (e.key !== "Enter") return;

      this.props.addTodo(this.refs.todoText.value);
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
          <Todo todo={todo} />)}
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: name => dispatch(addTodo(name))
  };
};

const mapStateToProps = state => {
  return {
    todos: state
  };
};

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
